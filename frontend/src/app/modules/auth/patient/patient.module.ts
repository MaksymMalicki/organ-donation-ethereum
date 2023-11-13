import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';



@NgModule({
  declarations: [
    PatientComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PatientComponent,
  ]
})
export class PatientModule { }
