import {
  Component,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { SessionService } from 'src/app/services/common/session.service';
import { MenuService } from 'src/app/services/common/menu.service';
import { Subscription } from 'rxjs';
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
  suscription: Subscription;
  constructor(
    public menuService: MenuService,
    private session: SessionService
  ) {
    this.suscription = this.session.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
