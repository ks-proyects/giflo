import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
