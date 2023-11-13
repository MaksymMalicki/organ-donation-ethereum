import { Injectable } from '@angular/core';
import {Web3} from "web3";
// @ts-ignore
import * as DonationABI from "../../../abi/Donation.abi";
// @ts-ignore
import * as PatientsABI from "../../../abi/Patients.abi";
// @ts-ignore
import * as DoctorsABI from "../../../abi/Doctors.abi";
// @ts-ignore
import * as DonorsABI from "../../../abi/Donors.abi";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  rpcUrl = 'http://localhost:8545';
  private config = {
    rpcUrl: 'http://localhost:8545',
    patientsContract: {
      address: '0x0',
      abi: PatientsABI
    },
    doctorsContract: {
      address: '0x0',
      abi: DoctorsABI
    },
    donorsContract: {
      address: '0x0',
      abi: DonorsABI
    },
    donationContract: {
      address: '0x0',
      abi: DonationABI
    },
  }
  public web3: Web3
  public patientsContract;
  public doctorsContract;
  public donorsContract;
  public donationContract;
  constructor(
  ) { }

  loadWeb3(): any {
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
    this.patientsContract = new this.web3.eth.Contract(this.config.patientsContract.abi, this.config.patientsContract.address);
    this.doctorsContract = new this.web3.eth.Contract(this.config.doctorsContract.abi, this.config.doctorsContract.address);
    this.donorsContract = new this.web3.eth.Contract(this.config.donorsContract.abi, this.config.donorsContract.address);
    this.donationContract = new this.web3.eth.Contract(this.config.donationContract.abi, this.config.donationContract.address);
  }
}
