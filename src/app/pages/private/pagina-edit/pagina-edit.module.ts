import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaEditComponent } from './pagina-edit.component';
import { PaginaEditRoutingModule } from './pagina-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    PaginaEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    PaginaEditComponent
  ]
})
export class PaginaEditModule { }
