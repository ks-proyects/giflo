import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { SearchPipe } from '../pipes/search.pipe';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [MatIconModule, MatToolbarModule],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe,
    ToolbarButtonComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe,
    ToolbarButtonComponent
  ],
  providers: [MenuItems]
})
export class SharedModule { }
