import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';


import { MenuItems } from '../../../util/menu-items/menu-items';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  itemSelect: number[] = [];
  user: any;
  @Output() public logoutOUT = new EventEmitter();
  scrollToTop() {
    document.querySelector('.page-wrapper').scroll({
      top: 0,
      left: 0
    });
  }
  constructor(
    public menuItems: MenuItems,
    private session: SessionService
  ) {
    session.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
  }
}
