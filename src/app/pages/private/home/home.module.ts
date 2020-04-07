import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilModule } from 'src/app/util/util.module';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    UtilModule,
    MatCardModule,
    NgxDatatableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  declarations: [
    ProfileComponent,
    SettingComponent,
    ProfileEditComponent
  ]
})
export class HomeModule { }
