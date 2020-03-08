import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule } from '@angular/forms';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    CoreMaterialModule
  ],
  declarations: [
    MainComponent
  ]
})
export class HomeModule { }
