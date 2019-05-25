import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FirebaseModule } from './modules/firebase.module';
import { HomeComponent } from './components/private/home/home.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { AboutComponent } from './components/private/about/about.component';
import { ContactoComponent } from './components/private/contacto/contacto.component';
import { BaseComponent } from './components/base.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SaveUserDataComponent } from './components/save-user-data/save-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactoComponent,
    BaseComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SaveUserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FirebaseModule,
    FormsModule,
    FlexLayoutModule,
    LayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
