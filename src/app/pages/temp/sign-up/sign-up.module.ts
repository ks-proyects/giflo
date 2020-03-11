import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignUpComponent
  ]
})
export class SignUpModule { }
