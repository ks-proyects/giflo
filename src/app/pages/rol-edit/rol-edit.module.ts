import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolEditComponent } from './rol-edit.component';
import { RolEditRoutingModule } from './rol-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RolEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    RolEditComponent
  ]
})
export class RolEditModule { }
