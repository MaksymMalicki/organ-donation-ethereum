import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Transplantation} from "../../../shared/interfaces/transplantation.interface";
import {Patient} from "../../../shared/interfaces/patient.interface";
import {Web3Service} from "../../../shared/services/web3.service";
import {AuthService} from "../auth.service";
import {from} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  transplantations: Transplantation[] = [];
  transplantationsSearchTerm: string = "";
  patients: Patient[];
  patientsSearchTerm: string = "";
  proposals: any[];
  proposalsSearchTerm: string = "";
  newPatientForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.newPatientForm = this.formBuilder.group({
      patientAddress: [''],
      name: [''],
      age: [''],
      urgency: [''],
      bloodType: [''],
    });
    from(this.web3Service.patientsContract.methods.getDoctorsPatients().call({from: this.authService.address})).subscribe(
      (patients: any) => {
        this.patients = patients.filter(patient => patient.patientAddress !== "0x0000000000000000000000000000000000000000")
        this.getAllDoctorTransplantations();
      }
    );
    this.getDoctorProposals();
  }

  get filterPatients(): Patient[] {
    return this.patients.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.patientsSearchTerm.toLowerCase())
      )
    );
  }

  get filterProposals(): any[] {
    return this.proposals.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.proposalsSearchTerm.toLowerCase())
      )
    );
  }

  get filterTransplantation(): Transplantation[] {
    return this.transplantations.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.transplantationsSearchTerm.toLowerCase())
      )
    );
  }

  modifyPatientData(patient: Patient) {
    from(this.web3Service.patientsContract.methods.modifyPatient(
      patient.patientAddress,
      patient.name,
      patient.age,
      patient.urgency,
      patient.bloodType,
      patient.isInTransplantation
    ).send({from: this.authService.address})).subscribe(
      (patient) => {
        console.log(patient);
      }
    );
  }

  onNewPatientFormSubmit() {
    from(this.web3Service.patientsContract.methods.registerPatient(
      this.newPatientForm.value.patientAddress,
      this.newPatientForm.value.name,
      this.newPatientForm.value.age,
      this.newPatientForm.value.urgency,
      this.newPatientForm.value.bloodType,
    ).send({from: this.authService.address})).subscribe(
      (patient) => {
        console.log(patient);
      },
    );
  }

  deletePatient(patient: Patient) {
    from(this.web3Service.patientsContract.methods.removeByAddress(
      patient.patientAddress,
    ).send({from: this.authService.address})).subscribe(
      () => {
        console.log(patient);
        this.patients = this.patients.filter(patient => patient.patientAddress !== patient.patientAddress);
        this.changeDetectorRef.detectChanges();
      },
    );
  }

  getDoctorProposals() {
    this.http.get(`http://127.0.0.1:8000/query-proposal/${this.authService.address}/`).subscribe(
      (proposals: any) => {
        this.proposals = proposals;
        console.log(proposals);
      }
    );
  }

  acceptProposal(proposal: any) {
    this.http.post(`http://127.0.0.1:8000/accept-proposal/`, {
      donor_address: proposal.donor_address,
      doctor_address: this.authService.address,
    }).subscribe(
      (res: any) => {
        this.proposals = this.proposals.filter(proposal => proposal.doctorAddress !== this.authService.address);
        this.changeDetectorRef.detectChanges();
        from(this.web3Service.donationContract.methods.startTransplantation(proposal.patient_address, proposal.donor_address, "Nowa transplantacja").send({from: this.authService.address}))
          .subscribe();
      }
    )
  }

  rejectProposal(proposal: any) {
    console.log(proposal);
    this.http.post(`http://127.0.0.1:8000/reject-proposal/`, {
      donor_address: proposal.donor_address,
      doctor_address: this.authService.address,
    }).subscribe(
      (res: any) => {
        this.proposals = this.proposals.filter(proposal => proposal.doctor_address !== this.authService.address);
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  private getAllDoctorTransplantations() {
    this.patients.forEach(
      (patient: Patient) => {
        from(this.web3Service.donationContract.methods.getDoctorsTransplantations(patient.patientAddress).call({from: this.authService.address})).subscribe(
          (transplantations: any) => {
            console.log(transplantations);
            if(transplantations.patient !== "0x0000000000000000000000000000000000000000") this.transplantations.push(transplantations);
          }
        )
      }
    )
  }

  setTimeTransported(transplantation: Transplantation) {
    from(this.web3Service.donationContract.methods.setOrganTransported(transplantation.patient).send({from: this.authService.address})).subscribe();
  }

  setTimeTransplanted(transplantation: Transplantation) {
    from(this.web3Service.donationContract.methods.setOrganTransplanted(transplantation.patient).send({from: this.authService.address})).subscribe();
  }

  setTimeConfirmed(transplantation: Transplantation) {
    from(this.web3Service.donationContract.methods.setTransplantationStatus(transplantation.patient).send({from: this.authService.address})).subscribe();
  }

  setStatus(transplantation: Transplantation) {

  }
}
