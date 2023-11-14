import { Injectable } from '@angular/core';
import {Web3Service} from "../../shared/services/web3.service";
import {HttpClient} from "@angular/common/http";
import {from, map, Observable, switchMap, take, tap} from "rxjs";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  address = "";
  constructor(
    private web3Service: Web3Service,
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  public authenticate(address: string, passphrase: string){
    this.getNonce(address).pipe(
      map(
        (nonce) => "Nonce: " + nonce.nonce
      ),
      switchMap((message) => {
        console.log(message);
        return from(this.web3Service.web3.eth.personal.sign(message, address, passphrase));
      }),
      switchMap((signature) => {
        console.log(signature);
        return this.validateSignature(address, signature)
      }),
      tap(result => {
        console.log(result)
        if (result) {
          localStorage.setItem('address', address);
          this.address = address;
          this.router.navigate(['/doctor']);
        }
      }),
      take(1)
    ).subscribe();
  }

  private getNonce(address: string): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:8000/get-nonce/', {
      params: { ethereum_address: address },
    });
  }

  private validateSignature(address: string, signature: string): Observable<any> {
    return this.httpClient.post('http://127.0.0.1:8000/validate-signature/', {}, {
      params: { ethereum_address: address, signature: signature },
    });
  }

  public async isUserDoctor(): Promise<boolean>{
    if(!!this.address) return new Promise((resolve)=>resolve(false));
    const r = await this.web3Service.doctorsContract.getDoctorFromMapping(this.address);
    return r[0] === this.address;
  }

  public async isUserPatient(): Promise<boolean>{
    if(!!this.address) return new Promise((resolve)=>resolve(false));
    const r = await this.web3Service.patientsContract.getPatientFromMapping(this.address);
    return r[0] === this.address;
  }

  public async isUserOrganProcurementOrganiser(): Promise<boolean>{
    if(!!this.address) return new Promise((resolve)=>resolve(false));
    const r = await this.web3Service.donationContract.procurementOrganiser();
    return r[0] === this.address;
  }

  public async isUserDonor(): Promise<boolean>{
    if(!!this.address) return new Promise((resolve)=>resolve(false));
    const r = await this.web3Service.donorsContract.isDonor();
    return r[0] === this.address;
  }
}
