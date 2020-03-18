import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empresas/:id',
        component: EmpresaEditComponent
      },
      {
        path: 'empresas',
        component: EmpresaListComponent
      },

      {
        path: 'menuitems/:id',
        component: MenuItemEditComponent
      },
      {
        path: 'menuitems',
        component: MenuItemListComponent
      },
      {
        path: 'paginas/:id',
        component: PaginaEditComponent
      },
      {
        path: 'paginas',
        component: PaginaListComponent
      },
      {
        path: 'rols/:id',
        component: RolEditComponent
      },
      {
        path: 'rols',
        component: RolListComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
