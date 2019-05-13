import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FirebaseModule } from './modules/firebase.module';
import { GuardiaService } from './services/guardia.service';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/private/home/home.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/public/register/register.component';
import { RegisterUserDataComponent } from './components/public/register-user-data/register-user-data.component';
import { HomeLoginComponent } from './components/public/home-login/home-login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RegisterUserDataComponent,
    HomeLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FirebaseModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [GuardiaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
