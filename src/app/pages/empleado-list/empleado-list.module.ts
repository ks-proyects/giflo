import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoListComponent } from './empleado-list.component';
import { EmpleadoListRoutingModule } from './empleado-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EmpleadoListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EmpleadoListComponent
  ]
})
export class EmpleadoListModule { }
