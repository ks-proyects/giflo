import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appProduccion]'
})
export class ProduccionDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
