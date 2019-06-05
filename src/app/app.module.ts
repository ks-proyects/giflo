import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FirebaseModule } from './modules/firebase.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HomeComponent } from './components/private/home/home.component';
import { AboutComponent } from './components/private/about/about.component';
import { ContactoComponent } from './components/private/contacto/contacto.component';
import { BaseComponent } from './components/base.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CompanyComponent } from './components/company/company.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavComponent } from './components/nav/nav.component';
import { AdressComponent } from './components/adress/adress.component';
import { SignUpDataComponent } from './components/sign-up-data/sign-up-data.component';
import { CompanyDaoService } from './dao/company-dao.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ScrollContainerComponent } from './components/scroll-container/scroll-container.component';



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
    CompanyComponent,
    CompanyListComponent,
    PerfilComponent,
    NavComponent,
    AdressComponent,
    SignUpDataComponent,
    ScrollContainerComponent
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
    LayoutModule,
    ImageCropperModule,
    ReactiveFormsModule,
    ScrollingModule,
    InfiniteScrollModule
  ],
  providers: [AuthService, CompanyDaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
