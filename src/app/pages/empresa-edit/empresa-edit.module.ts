import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaEditComponent } from './empresa-edit.component';
import { EmpresaEditRoutingModule } from './empresa-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EmpresaEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EmpresaEditComponent
  ]
})
export class EmpresaEditModule { }
