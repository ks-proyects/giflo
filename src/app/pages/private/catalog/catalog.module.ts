import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
} from '@angular/material';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';

import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CatalogRoutingModule,
    CommonModule,
    FormsModule,
    UtilModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    EstadoCivilEditComponent,
    EstadoCivilListComponent,
    EstadoEditComponent,
    EstadoListComponent,
  ]
})
export class CatalogModule { }
