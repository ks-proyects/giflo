import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
