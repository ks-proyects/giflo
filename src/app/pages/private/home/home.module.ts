import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import {  MatCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    MatCardModule,
    NgxDatatableModule
  ],
  declarations: [
    ProfileComponent,
    SettingComponent
  ]
})
export class HomeModule { }
