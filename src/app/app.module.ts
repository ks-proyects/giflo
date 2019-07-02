import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './components/base.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CompanyComponent } from './components/company/company.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SignUpDataComponent } from './components/sign-up-data/sign-up-data.component';
import { AuthService } from './shared/services/auth.service';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { FirebaseModule } from './shared/modules/firebase.module';
import { CompanyService } from './shared/datasource/company.service';
import { EmployeService } from './shared/datasource/employe.service';
import { UserService } from './shared/datasource/user.service';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MatConfirmDialogComponent } from './components/common/mat-confirm-dialog/mat-confirm-dialog.component';
import { ScrollContainerComponent } from './components/common/scroll-container/scroll-container.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeComponent } from './components/employe/employe.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactoComponent,
    BaseComponent,
    SignInComponent,
    SignUpComponent,
    CompanyComponent,
    CompanyListComponent,
    PerfilComponent,
    SignUpDataComponent,
    ScrollContainerComponent,
    MatConfirmDialogComponent,
    EmployeesComponent,
    EmployeComponent,
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
  providers: [UserService, AuthService, CompanyService, EmployeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
