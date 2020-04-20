import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { RolService } from '../services/rol.service';
import { EstadoService } from '../services/estado.service';
import { PaginaService } from '../services/pagina.service';

/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private rolService: RolService,
        private estadoService: EstadoService,
        private paginaService: PaginaService,
        public ngZone: NgZone
    ) {
        rolService.init();
        estadoService.init();
        paginaService.init();
    }
    resetPasswordInit(email: string) {
        return this.afAuth.auth.sendPasswordResetEmail(
            email, { url: 'http://localhost:4200/auth' });
    }
    registerByEmailPass = (email, pass) => {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            if (user.user) {
                this.ngZone.run(() => {
                    this.router.navigate(['/home/index']);
                });
            }
        }).catch((error) => {
            window.alert(error.message);
        });
    }
    loginWithEmailPass(email, password) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
            if (user.user) {
                this.ngZone.run(() => {
                    this.router.navigate(['/home/index']);
                });
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
                this.ngZone.run(() => {
                    this.router.navigate(['/home/index']);
                });
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
        this.router.navigate(['/']);
    }

    /**
     * Get the logged user
     */
    public getUser(): Observable<firebase.User> {
        return this.afAuth.user;
    }
}
