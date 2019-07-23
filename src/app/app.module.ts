// DEPENDENCIES
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// FIREBASE
import { CoreFirebaseModule } from './core.firebase.module';
// SHARED MODULE
import { SharedModule } from './shared/shared.module';

// CORE MODULE
import { CoreModule } from './core.module';

// LAYOUT
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';

// DIRECTIVES
import { MailValidator } from './directives/mail.validate.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { BaseComponent } from './components/base.component';
import { CoreMaterialModule } from './core.material.module';

import { ContactoComponent } from './components/contacto/contacto.component';
import { MatConfirmDialogComponent } from './components/common/mat-confirm-dialog/mat-confirm-dialog.component';
import { ScrollContainerComponent } from './components/common/scroll-container/scroll-container.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { EmployeComponent } from './components/employe/employe.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpDataComponent } from './components/sign-up-data/sign-up-data.component';
import { HomeComponent } from './components/home/home.component';
// DECLARE APPLICATION MODULE
@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule, // ROUTES
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    CoreFirebaseModule,
    CoreMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    LayoutModule,
    ImageCropperModule,
    ReactiveFormsModule,
    ScrollingModule,
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    CoreMaterialModule
  ],
  declarations: [
    // LAYOUT
    AppComponent,
    NavbarComponent,
    MailValidator,
    ContactoComponent,
    BaseComponent,
    ScrollContainerComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    AboutComponent,
    CompanyComponent,
    CompanyListComponent,
    EmployeComponent,
    EmployeesComponent,
    HomeComponent,
    PerfilComponent,
    SignInComponent,
    SignUpComponent,
    SignUpDataComponent
  ],
  providers: [],
})
export class AppModule { }
