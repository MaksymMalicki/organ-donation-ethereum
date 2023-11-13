import { Injectable } from '@angular/core';
import {Web3Service} from "../../shared/services/web3.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(
    private web3Service: Web3Service
  ) { }

  private authenticate(address: string, passphrase: string){
    this.web3Service.web3.eth.personal.unlockAccount(address, passphrase, 600).then(r => this.isLoggedIn = true);
  }

  private isUserDoctor(address: string){

  }

  private isUserPatient(address: string){

  }

  private isUserOrganProcurementOrganiser(address: string){

  }
}
