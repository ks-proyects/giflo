import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/domain/giflo_db/user';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  @Output() public logoutOUT = new EventEmitter();
  @Input() public nombreEmpresa: boolean;
  @Output() public changeEmpresaOUT = new EventEmitter();
  user: any = {};
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/3.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    }
  ];
  constructor(session: SessionService) {
    session.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
}
