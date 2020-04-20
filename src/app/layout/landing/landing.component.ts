import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blank',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
  constructor(
    public router: Router
  ) {
  }
}
