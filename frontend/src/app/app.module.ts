import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/auth.service';
import {Web3Service} from "./shared/services/web3.service";
import {
  OrganProcurementOrganiserComponent
} from "./modules/auth/organ-procurement-organiser/organ-procurement-organiser.component";
import {LoginComponent} from "./modules/unauth/login/login.component";
import {PatientComponent} from "./modules/auth/patient/patient.component";
import {LandingComponent} from "./modules/unauth/landing/landing.component";
import {DonorComponent} from "./modules/auth/donor/donor.component";
import {DoctorComponent} from "./modules/auth/doctor/doctor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BigIntToNumberPipe } from './shared/pipes/big-int-to-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrganProcurementOrganiserComponent,
    LoginComponent,
    PatientComponent,
    LandingComponent,
    DonorComponent,
    DoctorComponent,
    NavbarComponent,
    BigIntToNumberPipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTabsModule,
        FormsModule,
    ],
  providers: [
    AuthService,
    Web3Service,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
