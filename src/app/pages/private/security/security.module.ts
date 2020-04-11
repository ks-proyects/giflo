import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { routesSecurity } from './security-routing.module';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(routesSecurity),
    CommonModule,
    FormsModule,
    UtilModule,
    CoreMaterialModule
  ],
  declarations: [
    EmpresaEditComponent,
    EmpresaListComponent,
    MenuItemEditComponent,
    MenuItemListComponent,
    PaginaEditComponent,
    PaginaListComponent,
    RolEditComponent,
    RolListComponent,
  ]
})
export class SecurityModule { }
