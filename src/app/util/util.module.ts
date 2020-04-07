import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewReadonlyComponent } from './view-readonly/view-readonly.component';
import { SectionViewComponent } from './section-view/section-view.component';

@NgModule({
  declarations: [
    ToolbarButtonComponent,
    ViewReadonlyComponent,
    SectionViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  exports: [
    ToolbarButtonComponent,
    ViewReadonlyComponent,
    SectionViewComponent
  ]
})
export class UtilModule { }
