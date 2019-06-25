import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { AuthGuard } from '../guard/auth.guard';
import { SecureInnerPagesGuard } from '../guard/secure-inner-pages.guard';
import { CompanyComponent } from '../../components/company/company.component';
import { CompanyListComponent } from '../../components/company-list/company-list.component';
import { SignUpDataComponent } from '../../components/sign-up-data/sign-up-data.component';
import { PerfilComponent } from '../../components/perfil/perfil.component';
import { AboutComponent } from '../../components/about/about.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { MatConfirmDialogComponent } from '../../components/common/mat-confirm-dialog/mat-confirm-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up-data', component: SignUpDataComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactoComponent, canActivate: [AuthGuard]},
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'companyList', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: MatConfirmDialogComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

