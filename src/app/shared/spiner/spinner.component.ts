import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
@Component({
  selector: 'app-spinner',
  template: `<div class="preloader" *ngIf="isSpinnerVisible">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public isSpinnerVisible = true;
  constructor(private router: Router) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
   }

  ngOnInit() {
    this.isSpinnerVisible = false;
  }

}
