import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { IndexComponent } from './index.component';

export const routesHome: Routes = [
  {
    path: '',
    children: [
      {
        path: 'index',
        component: IndexComponent,
        data: {
          title: 'Inicio',
          urls: [
            { title: 'home', url: '/home/index' },
            { title: 'home' }
          ]
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Perfil',
          urls: [
            { title: 'Inicio', url: '/home/index' },
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
            { title: 'Inicio', url: '/home/index' },
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
