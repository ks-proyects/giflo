import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloqueEditComponent } from './bloque-edit.component';
import { BloqueEditRoutingModule } from './bloque-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BloqueEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BloqueEditComponent
  ]
})
export class BloqueEditModule { }
