import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Web3Service} from "../../../shared/services/web3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  hospitals: any[] = [];
  constructor(
    private authService: AuthService,
    private web3Service: Web3Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getHospitals().subscribe(
      (hospitals: any[]) => {
        this.hospitals = hospitals;
      }
    )
  }

  hospitalSelected(hospital: any) {
    this.web3Service.loadWeb3();
    this.router.navigate(['/login'])
  }

}
