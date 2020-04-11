// DEPENDENCIES
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// FIREBASE
import { CoreFirebaseModule } from './core.firebase.module';
// SHARED MODULE
import { SharedModule } from './shared/shared.module';
import { AppRoutes } from './app.routing';
// CORE MODULE
import { CoreServiceModule } from './core.service.module';
// LAYOUT
import { AppComponent } from './app.component';
// DIRECTIVES
import { MailValidator } from './directives/mail.validate.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './shared/spiner/spinner.component';
import { LandingComponent } from './layout/landing/landing.component';
import { FullComponent } from './layout/full/full.component';
import { AppHeaderComponent } from './layout/full/header/header.component';
import { AppSidebarComponent } from './layout/full/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './layout/full/breadcrumb/breadcrumb.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppBlankComponent } from './layout/blank/blank.component';
import { MatDialogComponent } from './pages/common/mat-dialog/mat-dialog.component';
import { RouterModule } from '@angular/router';
import { CoreMaterialModule } from './core.material.module';
import { EmpresaDialogComponent } from './pages/private/home/empresa-dialog/empresa-dialog.component';
import { EmpleadoDialogComponent } from './pages/private/home/empleado-dialog/empleado-dialog.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.5,
  wheelPropagation: true
};

// DECLARE APPLICATION MODULE
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    AppBreadcrumbComponent,
    LandingComponent,
    MailValidator,
    MatDialogComponent,
    EmpleadoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    CoreFirebaseModule,
    CoreServiceModule,
    RouterModule.forRoot(AppRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ImageCropperModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    MatDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }