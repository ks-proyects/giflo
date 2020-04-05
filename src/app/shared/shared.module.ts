import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { SearchPipe } from '../pipes/search.pipe';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { KsSelectComponent } from './ks-select/ks-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe,
    ToolbarButtonComponent,
    KsSelectComponent,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe,
    ToolbarButtonComponent,
    KsSelectComponent
  ],
  providers: [MenuItems]
})
export class SharedModule { }
