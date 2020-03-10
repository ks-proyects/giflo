import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive
} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-blank',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements OnDestroy {

  
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

  public showSearch = false;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {this.mobileQuery = media.matchMedia('(min-width: 768px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}
}
