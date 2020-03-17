import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bloques/:id',
        component: BloqueEditComponent
      },
      {
        path: 'bloques',
        component: BloqueListComponent,
        data: {
          title: 'Bloques',
          urls: [
            { title: 'Bloques', url: '/dashboard' },
            { title: 'Bloques' }
          ]
        }
      },
      {
        path: 'camas/:id',
        component: CamaEditComponent
      },
      {
        path: 'camas',
        component: CamaListComponent
      },
      {
        path: 'empleados/:id',
        component: EmpleadoEditComponent
      },
      {
        path: 'empleados',
        component: EmpleadoListComponent
      },
      {
        path: 'empresas/:id',
        component: EmpresaEditComponent
      },
      {
        path: 'empresas',
        component: EmpresaListComponent
      },
      {
        path: 'estadocivils/:id',
        component: EstadoCivilEditComponent
      },
      {
        path: 'estadocivils',
        component: EstadoCivilListComponent
      },
      {
        path: 'estados/:id',
        component: EstadoEditComponent
      },
      {
        path: 'estados',
        component: EstadoListComponent
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
        path: 'naves/:id',
        component: NaveEditComponent
      },
      {
        path: 'naves',
        component: NaveListComponent
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
      },
      {
        path: 'variedads/:id',
        component: VariedadEditComponent
      },
      {
        path: 'variedads',
        component: VariedadListComponent
      }
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
