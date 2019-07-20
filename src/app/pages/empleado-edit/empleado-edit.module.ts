import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoEditComponent } from './empleado-edit.component';
import { EmpleadoEditRoutingModule } from './empleado-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EmpleadoEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EmpleadoEditComponent
  ]
})
export class EmpleadoEditModule { }
