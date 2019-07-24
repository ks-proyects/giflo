import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public apiKey: string = environment.firebase.apiKey;

    constructor(
        public authSer: AuthenticationService,
    ) { }

    /**
     * Login function
     */
    login() {
        this.authSer.login();
    }
    loginFacebook() {
        this.authSer.loginFacebook();
    }
}
