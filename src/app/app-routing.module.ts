import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { GuardiaService } from './services/guardia.service';
import { RegisterComponent } from './components/public/register/register.component';
import { RegisterUserDataComponent } from './components/public/register-user-data/register-user-data.component';
import { HomeLoginComponent } from './components/public/home-login/home-login.component';
import { AboutComponent } from './components/private/about/about.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'homeLogin', component: HomeLoginComponent},
  {path: 'registerData', component: RegisterUserDataComponent},
  {path: '', component: LoginComponent, canActivate: [GuardiaService]},
  {path: 'home', component: HomeComponent, canActivate: [GuardiaService], outlet: 'container'},
  {path: 'about', component: AboutComponent, canActivate: [GuardiaService], outlet: 'container'},
  {path: 'contact', component: AboutComponent, canActivate: [GuardiaService], outlet: 'container'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
