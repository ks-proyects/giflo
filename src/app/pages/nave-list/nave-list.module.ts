import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaveListComponent } from './nave-list.component';
import { NaveListRoutingModule } from './nave-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    NaveListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    NaveListComponent
  ]
})
export class NaveListModule { }
