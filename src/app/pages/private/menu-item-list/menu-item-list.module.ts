import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemListComponent } from './menu-item-list.component';
import { MenuItemListRoutingModule } from './menu-item-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MenuItemListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    MenuItemListComponent
  ]
})
export class MenuItemListModule { }
