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
        component: ProfileComponent,
        data: {
          title: 'Perfil',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: '' }
          ]
        }
      },
      {
        path: 'setting',
        component: SettingComponent,
        data: {
          title: 'Configuración',
          urls: [
            { title: 'Inicio', url: '/admin/home' },
            { title: '' }
          ]
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
