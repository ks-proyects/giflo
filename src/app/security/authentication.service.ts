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
import { Rol } from '../domain/giflo_db/rol';
import { RolService } from '../services/rol.service';
import { EstadoService } from '../services/estado.service';
import { MenuItemService } from '../services/menu-item.service';
import { PaginaService } from '../services/pagina.service';



/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    userDoc: AngularFirestoreDocument < any > ;
    user: any = {};
    rolDefault: any = {};
    rolDefaultDoc: AngularFirestoreDocument<Rol>;
    constructor(
        public afAuth: AngularFireAuth,
        public afm: AngularFireMessaging,
        private router: Router,
        private userService: UserService,
        private rolService: RolService,
        private estadoService: EstadoService,
        private paginaService: PaginaService,
        private menuItemService: MenuItemService
    ) {
        rolService.init();
        estadoService.init();
        paginaService.init();
    }

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
                    
                    let userNew: User;
                    this.user = item.payload;
                    if (!this.user.exists) {
                        
                        this.rolDefaultDoc = this.rolService.get('DEF');
                        this.rolDefaultDoc.valueChanges().subscribe(itemRol => {
                            this.rolDefault = itemRol;
                            userNew = {
                                id: userL.uid,
                                mail: userL.email,
                                name: userL.displayName ? userL.displayName : userL.email.split('@')[0],
                                username: userL.email.split('@')[0],
                                password: '',
                                roles: [this.rolDefault.id],
                                surname: '',
                                token: [tokenGen]
                            };
                            this.userService.createCustom(userNew).then(() => {
                                this.menuItemService.createMenu(userNew.roles);
                            });
                        });
                    } else {
                        let tokens = this.user.data().token;
                        tokens.push(tokenGen);
                        tokens = tokens.filter(this.onlyUnique);
                        this.userDoc.set({
                            token: tokens
                        }, {
                            merge: true
                        }).then(() => {
                            this.menuItemService.createMenu(this.user.data().roles);
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
        debugger;
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
            debugger;
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