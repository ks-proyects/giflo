// DEPENDENCIES
import { Routes } from '@angular/router';
// SECURITY
import { AuthGuard } from './security/auth.guard';
import { LandingComponent } from './pages/public/landing/landing.component';
import { FullComponent } from './layout/full/full.component';
import { AppBlankComponent } from './layout/blank/blank.component';
import { NoneComponent } from './pages/public/none/none.component';
import { AuthNoneGuard } from './security/authNone.guard';
/**
 * WEB APP ROUTES
 */
export const AppRoutes: Routes = [
  {
    path: '',
    component: NoneComponent,
    canActivate: [AuthNoneGuard]
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        loadChildren: './pages/private/admin/admin.module#AdminModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'catalog',
        loadChildren: './pages/private/catalog/catalog.module#CatalogModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'management',
        loadChildren: './pages/private/management/management.module#ManagementModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'security',
        loadChildren: './pages/private/security/security.module#SecurityModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'home',
        loadChildren: './pages/private/home/home.module#HomeModule'
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './pages/authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
];
