import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Web3Service} from "../../../shared/services/web3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private web3Service: Web3Service,
    private router: Router,
  ) { }
  hospitals: any[] = [];

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      address: ['', Validators.required],
      passphrase: ['', Validators.required],
    });
    this.authService.getHospitals().subscribe(
      (hospitals: any[]) => {
        this.hospitals = hospitals;
      }
    )
  }

  submitLoginForm() {
    this.authService.authenticate(this.loginForm.value.passphrase);
  }
}
