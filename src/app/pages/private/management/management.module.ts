import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { routesManagment } from './management-routing.module';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(routesManagment),
    CommonModule,
    CoreMaterialModule,
    FormsModule,
    UtilModule
  ],
  declarations: [
    EmpleadoEditComponent,
    EmpleadoListComponent,
  ]
})
export class ManagementModule { }
