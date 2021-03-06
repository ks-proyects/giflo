import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.scss']
})
export class SectionViewComponent implements OnInit {

  @Input() public title: string;
  @Input() public icon: string;
  @Input() public expanded: boolean;

  constructor() { }

  ngOnInit() {
  }

}
