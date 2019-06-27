import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { BaseComponent } from './components/base.component';
import { AuthService } from './shared/services/auth.service';
import { ItemMenuService } from './shared/datasource/item-menu.service';
import { ItemMenu } from './shared/model/item-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
      public router: Router,
      private swUpdate: SwUpdate,
      private med: MediaMatcher,
      private cdr: ChangeDetectorRef,
      public authService: AuthService,
      public dsm: ItemMenuService) {
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
    return this.router.url !== '/sign-in' &&  this.router.url !== '/sign-up' &&  this.router.url !== '/sign-up-data';
  }
}
