import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';

import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';

@NgModule({
  imports: [
    PrivateRoutingModule
  ],
  declarations: [
    BloqueEditComponent,
    BloqueListComponent,
    CamaEditComponent,
    CamaListComponent,
    EmpleadoEditComponent
  ]
})
export class PrivateModule {}
