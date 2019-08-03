// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Import Services

// START - USED SERVICES

// END - USED SERVICES

/**
 * Home Component
 */
@Component({
    selector: 'app-home',
    templateUrl : './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(
        private location: Location
        ) {

    }
    ngOnInit() {
    }
}
