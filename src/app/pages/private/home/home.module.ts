import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { routesHome } from './home-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { RouterModule } from '@angular/router';
import { EmpresaDialogComponent } from './empresa-dialog/empresa-dialog.component';


@NgModule({
  imports: [
    RouterModule.forChild(routesHome),
    CommonModule,
    UtilModule,
    FormsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    CoreMaterialModule
  ],
  entryComponents: [
    AddressDialogComponent,
    EmpresaDialogComponent
  ],
  declarations: [
    ProfileComponent,
    SettingComponent,
    ProfileEditComponent,
    AddressDialogComponent,
    EmpresaDialogComponent
  ], exports: []
})
export class HomeModule { }
