import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCosecha]'
})
export class CosechaDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
    ) { }

}
