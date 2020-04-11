import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { AddressEditComponent } from './address-edit/address-edit.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    UtilModule,
    FormsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    CoreMaterialModule
  ],
  entryComponents: [
    AddressEditComponent
  ],
  declarations: [
    ProfileComponent,
    SettingComponent,
    ProfileEditComponent,
    AddressEditComponent
  ], exports: []
})
export class HomeModule { }
