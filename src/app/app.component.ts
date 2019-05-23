import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { BaseComponent } from './components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends BaseComponent implements OnInit {
  fillerNav = [
    {
      url: 'home',
      label: 'Principal'
    },
    {
      url: 'about',
      label: 'Acerca de Nosotros'
    },
    {
      url: 'contact',
      label: 'Contacto'
    }
  ];
  constructor(
      public router: Router,
      private swUpdate: SwUpdate,
      private med: MediaMatcher,
      private cdr: ChangeDetectorRef,
      private auth: AuthenticationService) {
      super(med, cdr);
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
  isHome() {
    return this.router.url !== '/register' &&  this.router.url !== '/homeLogin' &&  this.router.url !== '/login';
  }

  logout() {
    this.auth.logout().then(() => {
    }).catch((err) => {}).finally(() => { });
  }
}
