import { Component } from '@angular/core';
import { PushMessagingService } from './services/push-messaging.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'giflo';
  msg: any = {};
  constructor(private fpm: PushMessagingService , private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
          if (confirm('Existe una nueva versión desea actualizar?')) {
              window.location.reload();
          }
      });
    }
  }
  requestPermission() {
    this.fpm.requestPermission();
    this.fpm.listen();
    this.msg = this.fpm.subject;
  }
  requestPermission2() {
    this.fpm.requestPermission2();
  }
  requestPermission3() {
    this.fpm.requestPermission3();
  }
  requestPermission4() {
    this.fpm.listen();
  }
}
