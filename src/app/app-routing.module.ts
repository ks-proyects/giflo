import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';
import { AboutComponent } from './components/private/about/about.component';
import { ContactoComponent } from './components/private/contacto/contacto.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { NavComponent } from './components/nav/nav.component';
import { SignUpDataComponent } from './components/sign-up-data/sign-up-data.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up-data', component: SignUpDataComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactoComponent, canActivate: [AuthGuard]},
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'companyList', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'nav', component: NavComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: MatConfirmDialogComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

