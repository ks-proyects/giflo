import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaEditComponent } from './cama-edit.component';
import { CamaEditRoutingModule } from './cama-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CamaEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CamaEditComponent
  ]
})
export class CamaEditModule { }
