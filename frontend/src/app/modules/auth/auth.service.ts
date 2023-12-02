import {Injectable, NgZone} from '@angular/core';
import {Web3Service} from "../../shared/services/web3.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable, Subject, switchMap, take, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  address = "";
  role: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(
    private web3Service: Web3Service,
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  public setAddressAndRoleFromLocalStorage() {
    this.address = localStorage.getItem('address');
    this.role.next(localStorage.getItem('role'));
  }

  public async authenticate(passphrase: string){
    let address;
    try {
      let addresses = await this.web3Service.web3.eth.getAccounts();
      address = addresses[0];
    } catch (error) {
      console.error('Error signing message with MetaMask:', error);
      throw error;
    }
    this.getNonce(address).pipe(
      map(
        (nonce) => "Nonce: " + nonce.nonce
      ),
      switchMap((message) => {
        console.log(message, address, passphrase);
        return from(this.web3Service.web3.eth.personal.sign(message, address, passphrase));
      }),
      switchMap((signature) => {
        return this.validateSignature(address, signature)
      }),
      tap(result => {
        if (result) {
          localStorage.setItem('address', address);
          this.address = address;
          this.redirectToUserRole();
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

  public getHospitals(): Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/hospitals/');
  }

  public async isUserDoctor(): Promise<boolean>{
    if(!this.address) return new Promise((resolve)=>resolve(false));
    return await this.web3Service.doctorsContract.methods.isDoctor(this.address).call();
  }

  public async isUserPatient(): Promise<boolean>{
    if(!this.address) return new Promise((resolve)=>resolve(false));
    return await this.web3Service.patientsContract.methods.isPatient(this.address).call();
  }

  public async isUserOrganProcurementOrganiser(): Promise<boolean>{
    if(!this.address) return new Promise((resolve)=>resolve(false));
    const r = await this.web3Service.donationContract.methods["procurementOrganiser"]().call();
    return r === this.address;
  }

  public async isUserDonor(): Promise<boolean>{
    console.log(this.address, 'donor')
    if(!this.address) return new Promise((resolve)=>resolve(false));
    return await this.web3Service.donorsContract.methods.isDonor(this.address).call();
  }

  public redirectToUserRole(): void {
    Promise.all(
      [
        this.isUserDoctor(),
        this.isUserPatient(),
        this.isUserOrganProcurementOrganiser(),
        this.isUserDonor()
      ]
    ).then(
      ([isDoctor, isPatient, isOrganProcurementOrganiser, isDonor]) => {
        console.log(isDoctor, isPatient, isOrganProcurementOrganiser, isDonor)
        if(isDoctor) {
          localStorage.setItem('role', 'doctor');
          this.role.next('doctor');
          this.router.navigate(['/doctor']);
          return true;
        } else if(isPatient) {
          localStorage.setItem('role', 'patient');
          this.role.next('patient');
          this.router.navigate(['/patient']);
          return true;
        } else if(isOrganProcurementOrganiser) {
          localStorage.setItem('role', 'procurementOrganiser');
          this.role.next('procurementOrganiser');
          this.router.navigate(['/organ-procurement-organiser']);
          return true;
        } else if(isDonor) {
          localStorage.setItem('role', 'donor');
          this.role.next('donor');
          this.router.navigate(['/donor']);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('address');
    localStorage.removeItem('role');
    this.address = "";
    this.role.next("");
    this.router.navigate(['/login']);
  }

  public subscribeToAccountChanges(): void {
    console.log(this.web3Service.web3 && (window as any).ethereum);
    if (this.web3Service.web3 && (window as any).ethereum) {
      console.log('test');
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('test');
        this.ngZone.run(() => {
          this.logout();
        });
      });
    }
  }
}
