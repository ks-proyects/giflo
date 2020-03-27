import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-blank',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  url: string;
  sidebarOpened;
  status = false;
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    session: SessionService
  ) {this.mobileQuery = media.matchMedia('(min-width: 768px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}


// Mini sidebar
}
