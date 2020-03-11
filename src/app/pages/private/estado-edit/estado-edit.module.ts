import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoEditComponent } from './estado-edit.component';
import { EstadoEditRoutingModule } from './estado-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EstadoEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EstadoEditComponent
  ]
})
export class EstadoEditModule { }
