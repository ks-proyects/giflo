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
import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatBadgeModule} from '@angular/material';
import { SpinnerComponent } from './shared/spiner/spinner.component';
import { BlankComponent } from './layout/blank/blank.component';
import { AppHeaderComponent } from './layout/full/header/header.component';
import { AppSidebarComponent } from './layout/full/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './layout/full/breadcrumb/breadcrumb.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
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
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    
    PerfectScrollbarModule,
    

  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatBadgeModule
  ],
  declarations: [
    // LAYOUT
    AppComponent,
    NavbarComponent,
    MailValidator,
    SpinnerComponent,
    BlankComponent,
    AppHeaderComponent,
    AppSidebarComponent,
	  AppBreadcrumbComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class AppModule { }
