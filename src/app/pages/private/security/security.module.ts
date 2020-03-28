import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { SecurityRoutingModule } from './security-routing.module';

@NgModule({
  imports: [
    SecurityRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
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
export class SecurityModule {}
