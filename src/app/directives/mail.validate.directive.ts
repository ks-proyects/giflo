import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[isMail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MailValidator, multi: true }]
})
export class MailValidator implements Validator {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  validate(control: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    const mail = control.value;

    const regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)| (".+"))@((\[[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\])| (([a - zA - Z\-0 - 9] +\.) + [a - zA - Z]{ 2,})) $ /;
    if (!mail) { return null; }

    if (!regExpMail.test(mail)) {
      this.renderer.addClass(this.elRef.nativeElement, 'is-invalid');
      return {
        validateEqual: false
      };
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
    }
    return null;
  }
}
