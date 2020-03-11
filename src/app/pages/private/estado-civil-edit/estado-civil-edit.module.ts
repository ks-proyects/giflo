import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoCivilEditComponent } from './estado-civil-edit.component';
import { EstadoCivilEditRoutingModule } from './estado-civil-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EstadoCivilEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EstadoCivilEditComponent
  ]
})
export class EstadoCivilEditModule { }
