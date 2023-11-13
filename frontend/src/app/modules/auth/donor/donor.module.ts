import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorComponent } from './donor.component';



@NgModule({
  declarations: [
    DonorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DonorComponent,
  ]
})
export class DonorModule { }
