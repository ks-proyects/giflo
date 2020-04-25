import { NgModule } from '@angular/core';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { SearchPipe } from '../pipes/search.pipe';
import { MenuService } from '../services/common/menu.service';
@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SearchPipe
  ],
  providers: [MenuService]
})
export class SharedModule { }
