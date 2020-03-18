import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatAutocompleteModule,
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

@NgModule({
  imports: [
    ManagementRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
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
