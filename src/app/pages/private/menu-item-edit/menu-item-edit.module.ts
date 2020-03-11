import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemEditComponent } from './menu-item-edit.component';
import { MenuItemEditRoutingModule } from './menu-item-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MenuItemEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    MenuItemEditComponent
  ]
})
export class MenuItemEditModule { }
