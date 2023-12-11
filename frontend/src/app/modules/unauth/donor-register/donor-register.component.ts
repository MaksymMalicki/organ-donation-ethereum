import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {from} from "rxjs";
import {Web3Service} from "../../../shared/services/web3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donor-register',
  templateUrl: './donor-register.component.html',
  styleUrls: ['./donor-register.component.scss']
})
export class DonorRegisterComponent implements OnInit {
  donorDataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.donorDataForm = this.formBuilder.group({
      donorAddress: [''],
      name: [''],
      age: [''],
      bloodType: [''],
    });
  }

  submitDonorDataForm() {
    from(this.web3Service.donorsContract.methods.modifyDonor(
      this.donorDataForm.value.address,
      this.donorDataForm.value.name,
      this.donorDataForm.value.age,
      this.donorDataForm.value.bloodType,
      true,
      true,
    ).send()).subscribe(
      (donor) => {
        this.router.navigate(['/login']);
      }
    );
  }

}
