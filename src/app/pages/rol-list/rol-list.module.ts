import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolListComponent } from './rol-list.component';
import { RolListRoutingModule } from './rol-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RolListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    RolListComponent
  ]
})
export class RolListModule { }
