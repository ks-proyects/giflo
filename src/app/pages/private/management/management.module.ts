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
  MatSelectModule} from '@angular/material';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { ManagementRoutingModule } from './management-routing.module';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    ManagementRoutingModule,
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
    EmpleadoEditComponent,
    EmpleadoListComponent,
  ]
})
export class ManagementModule {}
