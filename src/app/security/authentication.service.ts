import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) { }

    registerByEmailPass = ( email, pass) => {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            if (user.user) {
                this.router.navigate(['/']);
            }
        }).catch((error) => {
          window.alert(error.message);
        });
      }

    loginWithEmailPass(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
            if (user.user) {
                this.router.navigate(['/']);
            }
        }).catch((error) => {
          window.alert(error.message);
        });
      }
    loginFacebook() {
        return this.loginProvider(new auth.FacebookAuthProvider());
    }
    loginGoogle() {
        return this.loginProvider(new auth.GoogleAuthProvider());
    }
    loginProvider(provider) {
        return this.afAuth.auth.signInWithPopup(provider).then(user => {
            if (user.user) {
                this.router.navigate(['/']);
            }
        }).catch((error) => {
            window.alert(error);
        });
    }

    /**
     * Logout function
     */
    public logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
    }

    /**
     * Get the logged user
     */
    public getUser(): Observable<firebase.User> {
        return this.afAuth.user;
    }

}
