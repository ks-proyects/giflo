import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuItemEditComponent } from './menu-item-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuItemEditRoutingModule { }
