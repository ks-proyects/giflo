import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

/**
 * This component manage the NavBar
 *
 * @class NavbarComponent
 */
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    user: User;
    offline: boolean;
    constructor(public authenticationService: AuthenticationService, public router: Router) { }
    ngOnInit() {
        window.addEventListener('online', this.onNetworkStatusChange.bind(this));
        window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
        this.authenticationService.getUser().subscribe(user => this.user = user, err => this.user = null);
    }
    onNetworkStatusChange() {
        this.offline = !navigator.onLine;
        console.log('offline ' + this.offline);
    }
}
