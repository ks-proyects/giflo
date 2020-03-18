import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  MatAutocompleteModule,
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

import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
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
    BloqueEditComponent,
    BloqueListComponent,
    CamaEditComponent,
    CamaListComponent,
    NaveEditComponent,
    NaveListComponent,
    VariedadEditComponent,
    VariedadListComponent
  ]
})
export class AdminModule { }
