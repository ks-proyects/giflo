import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.less']
})
export class HomeLoginComponent implements OnInit {

  title:any ='Giflo';
  selectedValue: string = "";
  items = [
    { value: "0", view: "zero" },
    { value: "1", view: "one" },
    { value: "2", view: "Two" }
  ];
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  constructor(private media: MediaMatcher,private changeDetectorRef: ChangeDetectorRef) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
  }

}
