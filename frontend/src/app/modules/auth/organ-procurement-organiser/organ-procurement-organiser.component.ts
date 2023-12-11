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

const patientsMock: Patient[] = [
  {patientAddress: '0x4E398a277Bcd947d3397799433DE98950773b683', name: 'John Doe', age: 20, urgency: 1, bloodType: 'A+', dateAdded: (new Date()).getTime(), isInTransplantation: false},
  {patientAddress: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', name: 'John Doe', age: 20, urgency: 1, bloodType: 'A+', dateAdded: (new Date()).getTime(), isInTransplantation: false},
  {patientAddress: '0x5dD16bA687324A6792A57DaD9298f77F2f6214fC', name: 'John Doe', age: 20, urgency: 1, bloodType: 'A+', dateAdded: (new Date()).getTime(), isInTransplantation: false},
  {patientAddress: '0x4E398a277Bcd947d3397799433DE98950773b683', name: 'John Doe', age: 20, urgency: 1, bloodType: 'A+', dateAdded: (new Date()).getTime(), isInTransplantation: false},
  {patientAddress: '0xcDac861F0349903B22Cc55c58d55A6BBa3bBfdf5', name: 'John Doe', age: 20, urgency: 1, bloodType: 'A+', dateAdded: (new Date()).getTime(), isInTransplantation: false},
];
const doctorsMock: Doctor[] = [
  {doctorAddress: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', name: 'John Doe', age: 20, speciality: 'A+'},
  {doctorAddress: '0xcDac861F0349903B22Cc55c58d55A6BBa3bBfdf5', name: 'John Doe', age: 20, speciality: 'A+'},
  {doctorAddress: '0x4E398a277Bcd947d3397799433DE98950773b683', name: 'John Doe', age: 20, speciality: 'A+'},
];
const donorsMock: Donor[] = [
  {donorAddress: '0x06f009c3b6E013154A2D76Bf6D6B904a1d66550F', name: 'John Doe', age: 20, bloodType: 'A+', dateAdded: (new Date()).getTime(), isAlive: true, isKidneyGoodToTransplant: true},
  {donorAddress: '0x4A4068bDE53E67F6281dc70Dc38c3B2eb22af1Ff', name: 'John Doe', age: 20, bloodType: 'A+', dateAdded: (new Date()).getTime(), isAlive: true, isKidneyGoodToTransplant: true},
  {donorAddress: '0x1Cfce4Feeb7989179321Ce72b9A576Ceab8F4A43', name: 'John Doe', age: 20, bloodType: 'A+', dateAdded: (new Date()).getTime(), isAlive: true, isKidneyGoodToTransplant: true},
  {donorAddress: '0x3f8512E0a5883e3410405C02e74A2282DbDF5A71', name: 'John Doe', age: 20, bloodType: 'A+', dateAdded: (new Date()).getTime(), isAlive: true, isKidneyGoodToTransplant: true},
  {donorAddress: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', name: 'John Doe', age: 20, bloodType: 'A+', dateAdded: (new Date()).getTime(), isAlive: true, isKidneyGoodToTransplant: true},
];
const transplantationsMock: Transplantation[] = [
  {procurementOrganiser: '0xB5Da00630Ca5fdE4d9cED2fcdA0C607cE198F159', patient: '0x4E398a277Bcd947d3397799433DE98950773b683', donor: '0x3f8512E0a5883e3410405C02e74A2282DbDF5A71', doctor: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', timeCreated: (new Date()).getTime() - 1500000, timeTransported: 0, timeTransplanted: 0, transplantationStatusConfirmedTime: 0, isSuccessful: false, label: "Transplantacja 1"},
  {procurementOrganiser: '0xB5Da00630Ca5fdE4d9cED2fcdA0C607cE198F159', patient: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', donor: '0x7600De8a86A992292b9c06C743CC695cE06C04A4', doctor: '0xcDac861F0349903B22Cc55c58d55A6BBa3bBfdf5', timeCreated: (new Date()).getTime() - 2000000, timeTransported: 0, timeTransplanted: 0, transplantationStatusConfirmedTime: 0, isSuccessful: false, label: "Transplantacja 2"},
  {procurementOrganiser: '0xB5Da00630Ca5fdE4d9cED2fcdA0C607cE198F159', patient: '0x5dD16bA687324A6792A57DaD9298f77F2f6214fC', donor: '0x06f009c3b6E013154A2D76Bf6D6B904a1d66550F', doctor: '0x4E398a277Bcd947d3397799433DE98950773b683', timeCreated: (new Date()).getTime() - 2100000, timeTransported: 0, timeTransplanted: 0, transplantationStatusConfirmedTime: 0, isSuccessful: false, label: "Transplantacja 3"},
  {procurementOrganiser: '0xB5Da00630Ca5fdE4d9cED2fcdA0C607cE198F159', patient: '0x4E398a277Bcd947d3397799433DE98950773b683', donor: '0x4A4068bDE53E67F6281dc70Dc38c3B2eb22af1Ff', doctor: '0x4E398a277Bcd947d3397799433DE98950773b683', timeCreated: (new Date()).getTime() - 2200000, timeTransported: 0, timeTransplanted: 0, transplantationStatusConfirmedTime: 0, isSuccessful: false, label: "Transplantacja 4"},
];

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
    //TODO: remove mock
    this.transplantations = transplantationsMock;
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
        //TODO: remove mock
        this.patients = patientsMock;
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
        //TODO: remove mock
        this.donors = donorsMock;
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
        //TODO: remove mock
        this.doctors = doctorsMock;
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
