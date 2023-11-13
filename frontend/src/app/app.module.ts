import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './modules/unauth/landing/landing.component';
import { OrganProcurementOrganiserComponent } from './modules/auth/organ-procurement-organiser/organ-procurement-organiser.component';
import { PatientComponent } from './modules/auth/patient/patient.component';
import { DonorComponent } from './modules/auth/donor/donor.component';
import { DoctorComponent } from './modules/auth/doctor/doctor.component';
import { AuthService } from './modules/auth/auth.service';
import {Web3Service} from "./shared/services/web3.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    OrganProcurementOrganiserComponent,
    PatientComponent,
    DonorComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    Web3Service,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }