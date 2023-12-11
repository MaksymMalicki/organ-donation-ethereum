import { Injectable } from '@angular/core';
import {Web3} from "web3";
import {doctorsAbi, donationAbi, donorsAbi, patientsAbi} from "../consts/abi.const";


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private config = {
    rpcUrl: "",
    patientsContract: {
      address: '0xd5f19bA217eed23E4d004938158d46e9755d28Ee',
      abi: patientsAbi
    },
    doctorsContract: {
      address: '0x98538c41B236F5CABb434C6C06F95bDb0a74506A',
      abi: doctorsAbi
    },
    donorsContract: {
      address: '0xbdbD100fAa50a5E779EadAEC7a42877c99197902',
      abi: donorsAbi
    },
    donationContract: {
      address: '0xdaBDb2C4224C8b98000A3FADe4EcB9a8F79995ee',
      abi: donationAbi
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
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      (window as any).ethereum.enable();
    } else {
      console.error('MetaMask is not installed');
    }
    this.patientsContract = new this.web3.eth.Contract(
      this.config.patientsContract.abi,
      this.config.patientsContract.address
    );
    this.doctorsContract = new this.web3.eth.Contract(this.config.doctorsContract.abi, this.config.doctorsContract.address);
    this.donorsContract = new this.web3.eth.Contract(this.config.donorsContract.abi, this.config.donorsContract.address);
    this.donationContract = new this.web3.eth.Contract(this.config.donationContract.abi, this.config.donationContract.address);
  }
}
