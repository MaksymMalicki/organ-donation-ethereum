import { Component, OnInit } from '@angular/core';
import {Patient} from "../../../shared/interfaces/patient.interface";
import {Transplantation} from "../../../shared/interfaces/transplantation.interface";
import {Web3Service} from "../../../shared/services/web3.service";
import {AuthService} from "../auth.service";
import {from} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patient: Patient;
  transplantation: Transplantation;
  patientDataForm: FormGroup;
  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.patientDataForm = this.formBuilder.group({
      address: [''],
      name: [''],
      age: [''],
      bloodType: [''],
    });
    from(this.web3Service.patientsContract.methods.getPatientFromMapping(this.authService.address).call()).subscribe(
      (patient: any) => {
       this.patient = patient;
       this.patientDataForm.patchValue(this.patient);
      }
    );
    this.getPatientTransplantation();
  }

  submitPatientDataForm() {
    from(this.web3Service.patientsContract.methods.modifyPatient(
      this.patientDataForm.value.address,
      this.patientDataForm.value.name,
      this.patientDataForm.value.age,
      this.patient.urgency,
      this.patientDataForm.value.bloodType,
      false
    ).call({from: this.authService.address})).subscribe(
      (patient) => {
        this.patient = patient as Patient;
      }
    );
  }

  submitPatientResignation() {
    console.log(this.authService.address)
    from(this.web3Service.patientsContract.methods.removeByAddress(this.authService.address).send({from: this.authService.address})).subscribe(
      () => {
        this.authService.logout();
      }
    );
  }

  getPatientTransplantation() {
    from(this.web3Service.donationContract.methods.getPatientTransplantation().call({from: this.authService.address})).subscribe(
      (transplantation: any) => {
        if(transplantation.patient == "0x0000000000000000000000000000000000000000"){
          this.transplantation = null;
        } else {
          this.transplantation = transplantation as Transplantation;
        }
      }
    );
  }
}
