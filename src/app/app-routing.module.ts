import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { GuardiaService } from './services/guardia.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [GuardiaService]},
  {path: 'home', component: HomeComponent, canActivate: [GuardiaService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
