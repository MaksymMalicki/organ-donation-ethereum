import { Component, OnInit } from '@angular/core';
import {Donor} from "../../../shared/interfaces/donor.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Web3Service} from "../../../shared/services/web3.service";
import {AuthService} from "../auth.service";
import {from} from "rxjs";

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {
  donor: Donor;
  donorDataForm: FormGroup;
  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.donorDataForm = this.formBuilder.group({
      donorAddress: [''],
      name: [''],
      age: [''],
      bloodType: [''],
    });
    this.getDonorData();
  }

  getDonorData() {
    from(this.web3Service.donorsContract.methods.getDonorFromMapping(this.authService.address).call()).subscribe(
      (donor: any) => {
        console.log(donor);
        this.donor = this.parseChainDataToPatient(donor);
        this.donorDataForm.patchValue(this.donor);
      }
    );
  }

  parseChainDataToPatient(donorData): Donor{
    return {
      donorAddress: donorData.donorAddress,
      name: donorData.name,
      age: donorData.age,
      bloodType: donorData.bloodType,
      dateAdded: donorData.dateAdded,
      isAlive: donorData.isAlive,
    isKidneyGoodToTransplant: donorData[6],
    }
  }

  submitDonorDataForm() {
    const transactionObject = {
      from: this.authService.address,
    };
    from(this.web3Service.donorsContract.methods.modifyDonor(
      this.donorDataForm.value.address,
      this.donorDataForm.value.name,
      this.donorDataForm.value.age,
      this.donorDataForm.value.bloodType,
      this.donor.isAlive,
      this.donor.isKidneyGoodToTransplant,
    ).send(transactionObject)).subscribe(
      (donor) => {
        this.getDonorData();
      }
    );
  }
}
