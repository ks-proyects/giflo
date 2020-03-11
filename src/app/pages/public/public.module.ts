import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public.routing';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  declarations: [
    MainComponent
  ]
})
export class PublicModule { }
