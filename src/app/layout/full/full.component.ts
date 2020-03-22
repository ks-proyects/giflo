import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/session.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
@Component({
  selector: 'app-blank',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  showHide: boolean;
  url: string;
  sidebarOpened;
  status = false;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public session: SessionService,
    private auth: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout(event: any): void {
    this.auth.logout();
  }
}
