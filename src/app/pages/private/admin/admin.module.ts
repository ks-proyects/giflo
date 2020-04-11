import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PrivateComponent } from '../private.component';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    UtilModule,
    CoreMaterialModule
  ],
  declarations: [
    BloqueEditComponent,
    BloqueListComponent,
    CamaEditComponent,
    CamaListComponent,
    NaveEditComponent,
    NaveListComponent,
    VariedadEditComponent,
    VariedadListComponent,
    PrivateComponent
  ]
})
export class AdminModule { }
