import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export const routesHome: Routes = [
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
      },
      {
        path: 'profile/:id',
        component: ProfileEditComponent,
        data: {
          title: 'Editar',
          urls: [
            { title: 'Perfil', url: '/home/profile' },
            { title: 'Editar' }
          ]
        }
      }
    ]
  }
];
