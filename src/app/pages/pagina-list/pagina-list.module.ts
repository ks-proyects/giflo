import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaListComponent } from './pagina-list.component';
import { PaginaListRoutingModule } from './pagina-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    PaginaListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    PaginaListComponent
  ]
})
export class PaginaListModule { }
