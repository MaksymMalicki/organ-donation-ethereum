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
import {isProcurementOrganiser} from "./shared/guards/is-procurement-organiser.guard";
import {IsDoctorGuard} from "./shared/guards/is-doctor.guard";
import {IsDonorGuard} from "./shared/guards/is-donor.guard";
import {IsPatientGuard} from "./shared/guards/is-patient.guard";
import {DonorRegisterComponent} from "./modules/unauth/donor-register/donor-register.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: DonorRegisterComponent,
  },
  {
    path: 'organ-procurement-organiser',
    component: OrganProcurementOrganiserComponent,
    canActivate: [isProcurementOrganiser],
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [IsDoctorGuard],
  },
  {
    path: 'donor',
    component: DonorComponent,
    canActivate: [IsDonorGuard],
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [IsPatientGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
