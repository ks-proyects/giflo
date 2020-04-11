import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadoCivilEditComponent } from './estado-civil-edit/estado-civil-edit.component';
import { EstadoCivilListComponent } from './estado-civil-list/estado-civil-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';

@NgModule({
  imports: [
    CatalogRoutingModule,
    CommonModule,
    FormsModule,
    UtilModule,
    CoreMaterialModule
  ],
  declarations: [
    EstadoCivilEditComponent,
    EstadoCivilListComponent,
    EstadoEditComponent,
    EstadoListComponent,
  ]
})
export class CatalogModule { }
