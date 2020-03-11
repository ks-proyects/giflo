import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoCivilListComponent } from './estado-civil-list.component';
import { EstadoCivilListRoutingModule } from './estado-civil-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EstadoCivilListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EstadoCivilListComponent
  ]
})
export class EstadoCivilListModule { }
