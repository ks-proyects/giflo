import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
