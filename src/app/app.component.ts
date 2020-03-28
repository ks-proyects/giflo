import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthenticationService } from './security/authentication.service';
import { MenuItem } from './domain/giflo_db/menu-item';
import { Pagina } from './domain/giflo_db/pagina';
import { SessionService } from './services/session.service';
import { AppService } from './services/app.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    public afm: AngularFireMessaging) {
    this.afm.requestToken.subscribe(newToken => {
      console.log('Accepted Notifications');
    });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        if (confirm('Existe una nueva versión desea actualizar?')) {
          window.location.reload();
        }
      });
    }
  }
  ngOnInit() {
  }
}
