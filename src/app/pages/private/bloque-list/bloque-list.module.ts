import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloqueListComponent } from './bloque-list.component';
import { BloqueListRoutingModule } from './bloque-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BloqueListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BloqueListComponent
  ]
})
export class BloqueListModule { }
