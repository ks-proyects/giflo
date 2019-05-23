import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { HomeLoginComponent } from './components/public/home-login/home-login.component';
import { AboutComponent } from './components/private/about/about.component';
import { AuthGuard } from './services/auth.guard';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';
import { ContactoComponent } from './components/private/contacto/contacto.component';
import { RegisterUserDataComponent } from './components/public/register-user-data/register-user-data.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'homeLogin', component: HomeLoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'registerData', component: RegisterUserDataComponent, canActivate: [SecureInnerPagesGuard]},
  {path: '', component: HomeComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

