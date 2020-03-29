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
import { ImageCropperModule } from 'ngx-image-cropper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreMaterialModule } from './core.material.module';
import { CommonModule } from '@angular/common';
import { 
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatSliderModule,
  MatDialogModule,

} from '@angular/material';
import { SpinnerComponent } from './shared/spiner/spinner.component';
import { LandingComponent } from './layout/landing/landing.component';
import { FullComponent } from './layout/full/full.component';
import { AppHeaderComponent } from './layout/full/header/header.component';
import { AppSidebarComponent } from './layout/full/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './layout/full/breadcrumb/breadcrumb.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppBlankComponent } from './layout/blank/blank.component';
import { MatDialogComponent } from './pages/common/mat-dialog/mat-dialog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.5,
  wheelPropagation: true
};

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
    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatDialogModule
  ],
  entryComponents:[
    MatDialogComponent
  ],
  declarations: [
    // LAYOUT
    AppComponent,
    NavbarComponent,
    MailValidator,
    SpinnerComponent,
    LandingComponent,
    FullComponent,
    AppBlankComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppBreadcrumbComponent,
    MatDialogComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class AppModule { }
