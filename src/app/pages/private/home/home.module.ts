import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import {
} from '@angular/material';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ProfileComponent,
    SettingComponent
  ]
})
export class HomeModule { }
