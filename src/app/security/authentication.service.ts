import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { RolService } from '../services/rol.service';
import { EstadoService } from '../services/estado.service';
import { PaginaService } from '../services/pagina.service';
import { CultivadorService } from '../services/common/cultivador.service';
import { MenuService } from '../services/common/menu.service';
import { SessionService } from '../services/common/session.service';
import { DiaTrabajoBaseService } from '../services/base/dia-trabajo.base.service';

/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        protected rolService: RolService,
        protected estadoService: EstadoService,
        protected paginaService: PaginaService,
        protected menuService: MenuService,
        protected sessionService: SessionService,
        protected cultivadorService: CultivadorService,
        public ngZone: NgZone
    ) {
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
