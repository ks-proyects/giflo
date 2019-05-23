import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {

  title: any = 'Giflo';
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
