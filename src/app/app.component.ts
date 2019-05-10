import { Component } from '@angular/core';
import { PushMessagingService } from './services/push-messaging.service';
import { SwUpdate } from '@angular/service-worker';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
          if (confirm('Existe una nueva versión desea actualizar?')) {
              window.location.reload();
          }
      });
    }
  }
}
