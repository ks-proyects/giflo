import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../services/user.service';
import { UserBase } from '../domain/giflo_db/base/user.base';
import { User } from '../domain/giflo_db/user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';


/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    userDoc: AngularFirestoreDocument < any > ;
    user: any = {};
    constructor(
        public afAuth: AngularFireAuth,
        public afm: AngularFireMessaging,
        private router: Router,
        private userService: UserService,
    ) {}

    registerByEmailPass = (email, pass) => {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            if (user.user) {
                this.createUpdateUser(user.user);
                this.router.navigate(['/']);
            }
        }).catch((error) => {
            window.alert(error.message);
        });
    }
    public createUpdateUser(userL) {
        this.afm.requestToken.subscribe(
            (tokenGen) => {
                this.userDoc = this.userService.get(userL.uid);
                this.userDoc.snapshotChanges().subscribe(item => {
                    debugger;
                    let userNew: User;
                    this.user = item.payload;
                    if (!this.user.exists) {
                        userNew = {
                            id: userL.uid,
                            mail: userL.email,
                            name: userL.displayName ? userL.displayName : userL.email.split('@')[0],
                            username: userL.email.split('@')[0],
                            password: '',
                            roles: ['DEFAULT'],
                            surname: '',
                            token: [tokenGen]
                        };
                        this.userService.createCustom(userNew);
                    } else {
                        let rols = item.payload.data().token;
                        rols.push(tokenGen);
                        rols = rols.filter(this.onlyUnique);
                        this.userDoc.set({
                            token: rols
                        }, {
                            merge: true
                        });
                    }
                    this.router.navigate(['/']);
                });
            },
            (error) => {
                window.alert(error.message);
            },
        );

    }
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
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
                this.createUpdateUser(user.user);
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
    public getUser(): Observable < firebase.User > {
        return this.afAuth.user;
    }
}