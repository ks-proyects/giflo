import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-readonly',
  templateUrl: './view-readonly.component.html',
  styleUrls: ['./view-readonly.component.scss']
})
export class ViewReadonlyComponent implements OnInit {

  @Input() public label: string;
  @Input() public value: string;
  @Input() public valueDate: Date;
  @Input() public valueEmail: string;
  @Input() public valuePhone: string;
  constructor() { }

  ngOnInit() {
  }

}
