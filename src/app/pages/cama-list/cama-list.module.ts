import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaListComponent } from './cama-list.component';
import { CamaListRoutingModule } from './cama-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CamaListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CamaListComponent
  ]
})
export class CamaListModule { }
