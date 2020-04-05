import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-ks-select',
  templateUrl: './ks-select.component.html',
  styleUrls: ['./ks-select.component.scss']
})
export class KsSelectComponent implements OnInit {

  @Input() public selectValue: any;
  @Input() public name: string;
  constructor(public device: DeviceService) { }

  ngOnInit() {
  }

}
