import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./modules/unauth/landing/landing.module').then(m=>m.LandingModule),
  },
  {
    path: 'organ-procurement-organiser',
    loadChildren: ()=>import('./modules/auth/organ-procurement-organiser/organ-procurement-organiser.module').then(m=>m.OrganProcurementOrganiserModule),
  },
  {
    path: 'doctor',
    loadChildren: ()=>import('./modules/auth/doctor/doctor.module').then(m=>m.DoctorModule),
  },
  {
    path: 'donor',
    loadChildren: ()=>import('./modules/auth/donor/donor.module').then(m=>m.DonorModule),
  },
  {
    path: 'patient',
    loadChildren: ()=>import('./modules/auth/patient/patient.module').then(m=>m.PatientModule),
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
