// DEPENDENCIES
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
// SECURITY
import { AuthGuard } from './security/auth.guard';
import { LandingComponent } from './layout/landing/landing.component';
import { FullComponent } from './layout/full/full.component';
import { AppBlankComponent } from './layout/blank/blank.component';
/**
 * WEB APP ROUTES
 */
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/public/public.module#PublicModule'
      },
    ]
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

/**
 * ROUTING MODULE
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
