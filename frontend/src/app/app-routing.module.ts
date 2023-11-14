import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./modules/unauth/landing/landing.component";
import {LoginComponent} from "./modules/unauth/login/login.component";
import {PatientComponent} from "./modules/auth/patient/patient.component";
import {DonorComponent} from "./modules/auth/donor/donor.component";
import {DoctorComponent} from "./modules/auth/doctor/doctor.component";
import {
  OrganProcurementOrganiserComponent
} from "./modules/auth/organ-procurement-organiser/organ-procurement-organiser.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'organ-procurement-organiser',
    component: OrganProcurementOrganiserComponent,
  },
  {
    path: 'doctor',
    component: DoctorComponent,
  },
  {
    path: 'donor',
    component: DonorComponent,
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: []
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
