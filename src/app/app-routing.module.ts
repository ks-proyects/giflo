import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';
import { AboutComponent } from './components/private/about/about.component';
import { ContactoComponent } from './components/private/contacto/contacto.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { SaveUserDataComponent } from './components/save-user-data/save-user-data.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyList2Component } from './components/company-list2/company-list2.component';
import { NavComponent } from './components/nav/nav.component';
import { AdressComponent } from './components/adress/adress.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactoComponent, canActivate: [AuthGuard]},
  { path: 'save-user-data', component: SaveUserDataComponent, canActivate: [AuthGuard]},
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'companyList', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'companyList2', component: CompanyList2Component, canActivate: [AuthGuard] },
  { path: 'nav', component: NavComponent, canActivate: [AuthGuard] },
  { path: 'address', component: AdressComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

