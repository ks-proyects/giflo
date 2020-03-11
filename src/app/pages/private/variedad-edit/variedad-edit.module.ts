import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariedadEditComponent } from './variedad-edit.component';
import { VariedadEditRoutingModule } from './variedad-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    VariedadEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    VariedadEditComponent
  ]
})
export class VariedadEditModule { }
