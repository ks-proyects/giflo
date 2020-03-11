import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaveEditComponent } from './nave-edit.component';
import { NaveEditRoutingModule } from './nave-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    NaveEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    NaveEditComponent
  ]
})
export class NaveEditModule { }
