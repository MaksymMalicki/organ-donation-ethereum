import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Doctor} from "../../../shared/interfaces/doctor.interface";
import {Donor} from "../../../shared/interfaces/donor.interface";
import {Patient} from "../../../shared/interfaces/patient.interface";
import {from} from "rxjs";
import {Web3Service} from "../../../shared/services/web3.service";
import {AuthService} from "../auth.service";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Transplantation} from "../../../shared/interfaces/transplantation.interface";

@Component({
  selector: 'app-organ-procurement-organiser',
  templateUrl: './organ-procurement-organiser.component.html',
  styleUrls: ['./organ-procurement-organiser.component.scss']
})
export class OrganProcurementOrganiserComponent implements OnInit {

  doctors: Doctor[] = [];
  patients: Patient[] = [];
  donors: Donor[] = [];
  transplantations: Transplantation[] = [];
  newDoctorForm: any;

  patientsSearchTerm: string = "";
  donorsSearchTerm: string = "";
  doctorsSearchTerm: string = "";
  transplantationsSearchTerm: string = "";

  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.newDoctorForm = this.formBuilder.group({
      doctorAddress: [''],
      name: [''],
      age: [''],
      speciality: [''],
    });
    from(this.web3Service.patientsContract.methods.getAllPatients().call({from:this.authService.address})).subscribe(
      (patients: any) => {
        this.patients = patients.map(
          (patient: any) => {
            return {
              patientAddress: patient.patientAddress,
              name: patient.name,
              age: patient.age,
              urgency: patient.urgency,
              bloodType: patient.bloodType,
              isInTransplantation: patient.isInTransplantation,
            } as Patient;
          }
        );
        this.patients = this.patients.filter(patient => patient.patientAddress !== "0x0000000000000000000000000000000000000000");
      }
    );
    from(this.web3Service.donorsContract.methods.getAllDonors().call({from:this.authService.address})).subscribe(
      (donors: any) => {
        this.donors = donors.map(
          (donor: any) => {
            return {
              donorAddress: donor.donorAddress,
              name: donor.name,
              age: donor.age,
              bloodType: donor.bloodType,
              isAlive: donor.isAlive,
              isKidneyGoodToTransplant: donor.isKidneyGoodToTransplant,
            } as Donor;
          }
        );
        this.donors = this.donors.filter(donor => donor.donorAddress !== "0x0000000000000000000000000000000000000000");
      }
    );
    from(this.web3Service.doctorsContract.methods.getAllDoctors().call({from:this.authService.address})).subscribe(
      (doctors: any) => {
        this.doctors = doctors.map(
          (doctor: any) => {
            return {
              doctorAddress: doctor.doctorAddress,
              name: doctor.name,
              age: doctor.age,
              speciality: doctor.speciality,
            } as Doctor;
          }
        );
        this.doctors = this.doctors.filter(doctor => doctor.doctorAddress !== "0x0000000000000000000000000000000000000000");
      }
    );
  }

  get filterPatients(): Patient[] {
    return this.patients.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.patientsSearchTerm.toLowerCase())
      )
    );
  }

  get filterDonors(): Donor[] {
    return this.donors.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.donorsSearchTerm.toLowerCase())
      )
    );
  }

  get filterDoctors(): Doctor[] {
    return this.doctors.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.doctorsSearchTerm.toLowerCase())
      )
    );
  }

  get filterTransplantations(): Transplantation[] {
    return this.transplantations.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.transplantationsSearchTerm.toLowerCase())
      )
    );
  }

  matchDonorWithPatients(donor: any) {
    from(this.web3Service.donationContract.methods.matchDonorToPatient(donor.donorAddress).call({from: this.authService.address}))
      .subscribe(
        (results: any) => {
          let filteredResults = results.filter(item => item.patientAddress !== "0x0000000000000000000000000000000000000000");
          filteredResults = {
            'donor_address': donor.donorAddress,
            'pairs': filteredResults.map(
              result => ({
                patient_address: result.patientAddress,
                doctor_address: result.patientsDoctor,
              })
            )
          }
          console.log(filteredResults, 'test');
          this.http.post('http://127.0.0.1:8000/proposal/', {
            ...filteredResults
          }).subscribe();
        }
      );
  }

  markDonorAsDead(donor: Donor) {
    from(this.web3Service.donorsContract.methods.markDonorAsDead(donor.donorAddress)
      .send({from: this.authService.address})).subscribe(

    )
  }

  navigateToTransplantationDetails(transplantation: any) {

  }

  onNewDoctorFormSubmit() {
    from(this.web3Service.doctorsContract.methods.registerDoctor(
      this.newDoctorForm.value.doctorAddress,
      this.newDoctorForm.value.name,
      this.newDoctorForm.value.age,
      this.newDoctorForm.value.speciality,
    ).send({from: this.authService.address})).subscribe(

    );
  }

  removeDoctor(doctor: Doctor) {
    from(this.web3Service.doctorsContract.methods.removeDoctor(doctor.doctorAddress).send({from: this.authService.address}))
      .subscribe(
        () => {
          this.doctors = this.doctors.filter(
            (doctor: Doctor) => {
              return doctor.doctorAddress !== doctor.doctorAddress;
            }
          );
          this.changeDetectorRef.detectChanges();
        }
      );
  }
}
