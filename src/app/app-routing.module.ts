// DEPENDENCIES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SECURITY
import { AuthGuard } from './security/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpDataComponent } from './components/sign-up-data/sign-up-data.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MatConfirmDialogComponent } from './components/common/mat-confirm-dialog/mat-confirm-dialog.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeComponent } from './components/employe/employe.component';

/**
 * WEB APP ROUTES
 */
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    /* START MY VIEWS */

    { path: 'estadocivils/:id', loadChildren: './pages/estado-civil-edit/estado-civil-edit.module#EstadoCivilEditModule', canActivate: [AuthGuard] },
    { path: 'estadocivils', loadChildren: './pages/estado-civil-list/estado-civil-list.module#EstadoCivilListModule', canActivate: [AuthGuard] },
    { path: 'estados/:id', loadChildren: './pages/estado-edit/estado-edit.module#EstadoEditModule', canActivate: [AuthGuard] },
    { path: 'estados', loadChildren: './pages/estado-list/estado-list.module#EstadoListModule', canActivate: [AuthGuard] },
    { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'menuitems/:id', loadChildren: './pages/menu-item-edit/menu-item-edit.module#MenuItemEditModule', canActivate: [AuthGuard] },
    { path: 'menuitems', loadChildren: './pages/menu-item-list/menu-item-list.module#MenuItemListModule', canActivate: [AuthGuard] },
    { path: 'paginas/:id', loadChildren: './pages/pagina-edit/pagina-edit.module#PaginaEditModule', canActivate: [AuthGuard] },
    { path: 'paginas', loadChildren: './pages/pagina-list/pagina-list.module#PaginaListModule', canActivate: [AuthGuard] },
    { path: 'rols/:id', loadChildren: './pages/rol-edit/rol-edit.module#RolEditModule', canActivate: [AuthGuard] },
    { path: 'rols', loadChildren: './pages/rol-list/rol-list.module#RolListModule', canActivate: [AuthGuard] },

 /* END MY VIEWS */
    // SECURITY
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'sign-in', component: SignInComponent},
    { path: 'sign-up', component: SignUpComponent},
];

/**
 * ROUTING MODULE
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
