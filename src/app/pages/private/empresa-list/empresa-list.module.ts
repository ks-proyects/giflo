import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from './empresa-list.component';
import { EmpresaListRoutingModule } from './empresa-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EmpresaListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EmpresaListComponent
  ]
})
export class EmpresaListModule { }
