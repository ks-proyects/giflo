import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit , OnDestroy{

  title: any = 'Giflo';
  mq: MediaQueryList;
  private mobileQueryListener: () => void;
  constructor(
    private medb: MediaMatcher,
    private cdrb: ChangeDetectorRef) {
      this.mq = this.medb.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.cdrb.detectChanges();
      this.mq.addEventListener('change', this.mobileQueryListener);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mq.removeEventListener('change', this.mobileQueryListener);
  }
}
