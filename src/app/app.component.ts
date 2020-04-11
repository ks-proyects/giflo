import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    public afm: AngularFireMessaging) {
    this.afm.requestToken.subscribe(newToken => {
      console.log('Accepted Notifications');
    });
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
}
