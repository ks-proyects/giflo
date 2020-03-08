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
import { CoreMaterialModule } from './core.material.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { SpinnerComponent } from './shared/spiner/spinner.component';
// DECLARE APPLICATION MODULE
@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule, // ROUTES
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    CoreFirebaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    LayoutModule,
    ImageCropperModule,
    ReactiveFormsModule,
    ScrollingModule,
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [
    // LAYOUT
    AppComponent,
    NavbarComponent,
    MailValidator,
    SpinnerComponent
  ],
  providers: [],
})
export class AppModule { }
