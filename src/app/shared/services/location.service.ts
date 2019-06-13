import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation() {
    if( navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geo Location not supported by browser');
    }
  }
  showPosition(position) {
    let location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    console.log(location);
  }
}
