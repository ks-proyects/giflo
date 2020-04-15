import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isMovile: boolean;
  activeMinivar: boolean;
  isOffline: boolean;
  private onlineEvent = fromEvent(window, 'online');
  private offlineEvent = fromEvent(window, 'offline');
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 959px)']).subscribe(result =>
      this.isMovile = result.matches ? true : false
    );
    breakpointObserver.observe(['(min-width: 768px)']).subscribe(result =>
      this.activeMinivar = result.matches ? true : false
    );
    this.offlineEvent.subscribe(eve => this.isOffline = true);
    this.onlineEvent.subscribe(eve => this.isOffline = false);
  }

}
