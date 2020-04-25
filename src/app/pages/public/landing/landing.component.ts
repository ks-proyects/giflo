import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-blank',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/home/index']);
      }
    });
  }
}
