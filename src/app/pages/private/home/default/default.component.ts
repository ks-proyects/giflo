import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/common/device.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: []
})
export class DefaultComponent implements OnInit {

  sizeTitle: string;
  sizeInfo: string;
  sizeList: string;
  paddingLogo: string;
  config: PerfectScrollbarConfigInterface = {};
  constructor(public device: DeviceService) {
    if (this.device.isMovile) {
      this.sizeTitle = "font-25";
      this.sizeInfo="font-16";
      this.sizeList="font-14";
      this.paddingLogo="p-b-20 p-t-0";
    } else {
      this.sizeTitle = "font-50";
      this.sizeInfo="font-20";
      this.sizeList="font-16";
      this.paddingLogo="p-b-20 p-t-0";
    }
  }

  ngOnInit() {

  }

}
