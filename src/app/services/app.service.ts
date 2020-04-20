import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  offline: Observable<boolean> = new Observable<boolean>(observer => { observer.next(false); });
  token: string;
  constructor() {
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }
  onNetworkStatusChange() {
    this.offline = new Observable<boolean>(observer => { observer.next(!navigator.onLine); });
  }
  getNetworkStatus() {
    return this.offline;
  }
}
