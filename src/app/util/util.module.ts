import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewReadonlyComponent } from './view-readonly/view-readonly.component';
import { SectionViewComponent } from './section-view/section-view.component';
import { CoreMaterialModule } from '../core.material.module';
import { SpinnerComponent } from '../shared/spiner/spinner.component';

@NgModule({
  declarations: [
    ToolbarButtonComponent,
    ViewReadonlyComponent,
    SectionViewComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    CoreMaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    ToolbarButtonComponent,
    ViewReadonlyComponent,
    SectionViewComponent,
    SpinnerComponent
  ]
})
export class UtilModule { }
