import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../services/user.service';
import { UserBase } from '../domain/giflo_db/base/user.base';
import { User } from '../domain/giflo_db/user';

/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    user: UserBase;
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private userService: UserService,
    ) { }

    registerByEmailPass = ( email, pass) => {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            if (user.user) {
                this.createUpdateUser(user.user);
                this.router.navigate(['/']);
            }
        }).catch((error) => {
          window.alert(error.message);
        });
      }
      public createUpdateUser(user){
          debugger;
          const userRet: any = this.userService.get(user.uid);
          if (!userRet) {
            const userNew: User = {
                id: user.user.uid,
                mail: user.user.email,
                name: user.user.displayName,
                username: user.user.email,
                password : '',
                roles: [''],
                surname: '',
                token: user.getIdToken()

            };
            this.userService.create(userNew);
          }
      }
    loginWithEmailPass(email, password) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
            if (user.user) {
                this.router.navigate(['/']);
            }
        }).catch((error) => {
          window.alert(error.message);
        });
      }
    loginFacebook() {
        this.loginProvider(new auth.FacebookAuthProvider());
    }
    loginGoogle() {
        this.loginProvider(new auth.GoogleAuthProvider());
    }
    loginProvider(provider) {
        this.afAuth.auth.signInWithPopup(provider).then(user => {
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
