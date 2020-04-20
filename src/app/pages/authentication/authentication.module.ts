import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { CoreMaterialModule } from 'src/app/core.material.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CoreMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  declarations: [
    ErrorComponent,
    ForgotComponent,
    LockscreenComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AuthenticationModule { }
