import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { BloqueEditComponent } from './bloque-edit/bloque-edit.component';

import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { CamaListComponent } from './cama-list/cama-list.component';
import { CamaEditComponent } from './cama-edit/cama-edit.component';
import { BloqueListComponent } from './bloque-list/bloque-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { MenuItemEditComponent } from './menu-item-edit/menu-item-edit.component';
import { NaveEditComponent } from './nave-edit/nave-edit.component';
import { NaveListComponent } from './nave-list/nave-list.component';
import { PaginaEditComponent } from './pagina-edit/pagina-edit.component';
import { PaginaListComponent } from './pagina-list/pagina-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { VariedadListComponent } from './variedad-list/variedad-list.component';
import { VariedadEditComponent } from './variedad-edit/variedad-edit.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';

@NgModule({
  imports: [
    PrivateRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BloqueEditComponent,
    BloqueListComponent,
    CamaEditComponent,
    CamaListComponent,
    EmpleadoEditComponent,
    EmpleadoListComponent,
    EmpresaEditComponent,
    EstadoCivilEditComponent,
    EstadoCivilListComponent,
    EstadoEditComponent,
    EstadoListComponent,
    MenuItemEditComponent,
    MenuItemListComponent,
    NaveEditComponent,
    NaveListComponent,
    PaginaEditComponent,
    PaginaListComponent,
    RolEditComponent,
    RolListComponent,
    VariedadEditComponent,
    VariedadListComponent
  ]
})
export class PrivateModule {}
