import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ErrorComponent,
    ForgotComponent,
    LockscreenComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule {}
