import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariedadListComponent } from './variedad-list.component';
import { VariedadListRoutingModule } from './variedad-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    VariedadListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    VariedadListComponent
  ]
})
export class VariedadListModule { }
