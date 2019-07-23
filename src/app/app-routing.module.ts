// DEPENDENCIES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SECURITY
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './pages/login/login.component';

/**
 * WEB APP ROUTES
 */
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    /* START MY VIEWS */

    { path: 'bloques/:id', loadChildren: './pages/bloque-edit/bloque-edit.module#BloqueEditModule', canActivate: [AuthGuard] },
    { path: 'bloques', loadChildren: './pages/bloque-list/bloque-list.module#BloqueListModule', canActivate: [AuthGuard] },
    { path: 'camas/:id', loadChildren: './pages/cama-edit/cama-edit.module#CamaEditModule', canActivate: [AuthGuard] },
    { path: 'camas', loadChildren: './pages/cama-list/cama-list.module#CamaListModule', canActivate: [AuthGuard] },
    { path: 'empleados/:id', loadChildren: './pages/empleado-edit/empleado-edit.module#EmpleadoEditModule', canActivate: [AuthGuard] },
    { path: 'empleados/:id', loadChildren: './pages/empleado-edit/empleado-edit.module#EmpleadoEditModule', canActivate: [AuthGuard] },
    { path: 'empleados', loadChildren: './pages/empleado-list/empleado-list.module#EmpleadoListModule', canActivate: [AuthGuard] },
    { path: 'empleados', loadChildren: './pages/empleado-list/empleado-list.module#EmpleadoListModule', canActivate: [AuthGuard] },
    { path: 'empresas/:id', loadChildren: './pages/empresa-edit/empresa-edit.module#EmpresaEditModule', canActivate: [AuthGuard] },
    { path: 'empresas/:id', loadChildren: './pages/empresa-edit/empresa-edit.module#EmpresaEditModule', canActivate: [AuthGuard] },
    { path: 'empresas', loadChildren: './pages/empresa-list/empresa-list.module#EmpresaListModule', canActivate: [AuthGuard] },
    { path: 'empresas', loadChildren: './pages/empresa-list/empresa-list.module#EmpresaListModule', canActivate: [AuthGuard] },
    { path: 'estadocivils/:id',
    loadChildren: './pages/estado-civil-edit/estado-civil-edit.module#EstadoCivilEditModule', canActivate: [AuthGuard] },
    { path: 'estadocivils',
    loadChildren: './pages/estado-civil-list/estado-civil-list.module#EstadoCivilListModule', canActivate: [AuthGuard] },
    { path: 'estados/:id', loadChildren: './pages/estado-edit/estado-edit.module#EstadoEditModule', canActivate: [AuthGuard] },
    { path: 'estados', loadChildren: './pages/estado-list/estado-list.module#EstadoListModule', canActivate: [AuthGuard] },
    { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'menuitems/:id', loadChildren: './pages/menu-item-edit/menu-item-edit.module#MenuItemEditModule', canActivate: [AuthGuard] },
    { path: 'menuitems', loadChildren: './pages/menu-item-list/menu-item-list.module#MenuItemListModule', canActivate: [AuthGuard] },
    { path: 'naves/:id', loadChildren: './pages/nave-edit/nave-edit.module#NaveEditModule', canActivate: [AuthGuard] },
    { path: 'naves', loadChildren: './pages/nave-list/nave-list.module#NaveListModule', canActivate: [AuthGuard] },
    { path: 'paginas/:id', loadChildren: './pages/pagina-edit/pagina-edit.module#PaginaEditModule', canActivate: [AuthGuard] },
    { path: 'paginas', loadChildren: './pages/pagina-list/pagina-list.module#PaginaListModule', canActivate: [AuthGuard] },
    { path: 'rols/:id', loadChildren: './pages/rol-edit/rol-edit.module#RolEditModule', canActivate: [AuthGuard] },
    { path: 'rols', loadChildren: './pages/rol-list/rol-list.module#RolListModule', canActivate: [AuthGuard] },
    { path: 'variedads/:id', loadChildren: './pages/variedad-edit/variedad-edit.module#VariedadEditModule', canActivate: [AuthGuard] },
    { path: 'variedads', loadChildren: './pages/variedad-list/variedad-list.module#VariedadListModule', canActivate: [AuthGuard] },

 /* END MY VIEWS */
    // SECURITY
    {
        path: 'login',
        component: LoginComponent
      }
];

/**
 * ROUTING MODULE
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
