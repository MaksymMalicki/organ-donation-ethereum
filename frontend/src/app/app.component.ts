import {Component, OnInit} from '@angular/core';
import {Web3Service} from "./shared/services/web3.service";
import {AuthService} from "./modules/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private web3Service: Web3Service,
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    this.authService.setAddressAndRoleFromLocalStorage();
    this.web3Service.loadWeb3();
    this.authService.subscribeToAccountChanges();
  }
}
