import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuItemListComponent } from './menu-item-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuItemListRoutingModule { }
