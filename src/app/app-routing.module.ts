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
          { path: 'private',
            loadChildren: './pages/private/private.module#PrivateModule'
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
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    /* START MY VIEWS */

    { path: 'bloques/:id', loadChildren: './pages/private/bloque-edit/bloque-edit.module#BloqueEditModule', canActivate: [AuthGuard] },
    { path: 'bloques', loadChildren: './pages/private/bloque-list/bloque-list.module#BloqueListModule', canActivate: [AuthGuard] },
    { path: 'camas/:id', loadChildren: './pages/private/cama-edit/cama-edit.module#CamaEditModule', canActivate: [AuthGuard] },
    { path: 'camas', loadChildren: './pages/private/cama-list/cama-list.module#CamaListModule', canActivate: [AuthGuard] },
    { path: 'empleados/:id', loadChildren: './pages/private/empleado-edit/empleado-edit.module#EmpleadoEditModule', canActivate: [AuthGuard] },
    { path: 'empleados/:id', loadChildren: './pages/private/empleado-edit/empleado-edit.module#EmpleadoEditModule', canActivate: [AuthGuard] },
    { path: 'empleados', loadChildren: './pages/private/empleado-list/empleado-list.module#EmpleadoListModule', canActivate: [AuthGuard] },
    { path: 'empleados', loadChildren: './pages/private/empleado-list/empleado-list.module#EmpleadoListModule', canActivate: [AuthGuard] },
    { path: 'empresas/:id', loadChildren: './pages/private/empresa-edit/empresa-edit.module#EmpresaEditModule', canActivate: [AuthGuard] },
    { path: 'empresas/:id', loadChildren: './pages/private/empresa-edit/empresa-edit.module#EmpresaEditModule', canActivate: [AuthGuard] },
    { path: 'empresas', loadChildren: './pages/private/empresa-list/empresa-list.module#EmpresaListModule', canActivate: [AuthGuard] },
    { path: 'empresas', loadChildren: './pages/private/empresa-list/empresa-list.module#EmpresaListModule', canActivate: [AuthGuard] },
    { path: 'estadocivils/:id',
    loadChildren: './pages/private/estado-civil-edit/estado-civil-edit.module#EstadoCivilEditModule', canActivate: [AuthGuard] },
    { path: 'estadocivils',
    loadChildren: './pages/private/estado-civil-list/estado-civil-list.module#EstadoCivilListModule', canActivate: [AuthGuard] },
    { path: 'estados/:id', loadChildren: './pages/private/estado-edit/estado-edit.module#EstadoEditModule', canActivate: [AuthGuard] },
    { path: 'estados', loadChildren: './pages/private/estado-list/estado-list.module#EstadoListModule', canActivate: [AuthGuard] },
    
    { path: 'menuitems/:id', loadChildren: './pages/private/menu-item-edit/menu-item-edit.module#MenuItemEditModule', canActivate: [AuthGuard] },
    { path: 'menuitems', loadChildren: './pages/private/menu-item-list/menu-item-list.module#MenuItemListModule', canActivate: [AuthGuard] },
    { path: 'naves/:id', loadChildren: './pages/private/nave-edit/nave-edit.module#NaveEditModule', canActivate: [AuthGuard] },
    { path: 'naves', loadChildren: './pages/private/nave-list/nave-list.module#NaveListModule', canActivate: [AuthGuard] },
    { path: 'paginas/:id', loadChildren: './pages/private/pagina-edit/pagina-edit.module#PaginaEditModule', canActivate: [AuthGuard] },
    { path: 'paginas', loadChildren: './pages/private/pagina-list/pagina-list.module#PaginaListModule', canActivate: [AuthGuard] },
    { path: 'rols/:id', loadChildren: './pages/private/rol-edit/rol-edit.module#RolEditModule', canActivate: [AuthGuard] },
    { path: 'rols', loadChildren: './pages/private/rol-list/rol-list.module#RolListModule', canActivate: [AuthGuard] },
    { path: 'variedads/:id', loadChildren: './pages/private/variedad-edit/variedad-edit.module#VariedadEditModule', canActivate: [AuthGuard] },
    { path: 'variedads', loadChildren: './pages/private/variedad-list/variedad-list.module#VariedadListModule', canActivate: [AuthGuard] },
];

/**
 * ROUTING MODULE
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
