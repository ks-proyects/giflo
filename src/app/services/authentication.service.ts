import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../model/user';
import { DaoUserService } from '../dao/dao-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userDb: User = null;
  private userAuthFire: any = null;
  private completRegister: boolean;
  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private userDAO: DaoUserService) {
    this.afa.authState.subscribe(
      (userAuth) => {
        this.userDb = null;
        this.userAuthFire = null;
        if ( userAuth && userAuth.uid) {
          this.userAuthFire = userAuth;
          this.completRegister = false;
          this.userDAO.findById(userAuth.uid).then((doc) => {
            debugger;
            if (doc.exists) {
              this.userDb = doc.data();
              this.completRegister = true;
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/registerData']);
            }
          }).catch((error) => {
            console.log('Error al consultar el usuario de la base ', error);
          });
        } else {
          this.router.navigate(['/homeLogin']);
        }
      },
      (error) => {
        console.log('Error al consultar el usuario de la autentificación ', error);
      });
  }
  public loginFacebook = () => {
    return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  public loginWithGoogle = () => {
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public loginWithEmailAndPass = (email: string, pass: string) => {
    return this.afa.auth.signInWithEmailAndPassword(email, pass);
  }
  public registerWithFacebook = () => {
    return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  public registerWithGoogle = () => {
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public registerWithEmailAndPass = (email, pass) => {
    return this.afa.auth.createUserWithEmailAndPassword(email, pass);
  }
  public logout = () => {
    return this.afa.auth.signOut();
  }
  public authState = () => {
    return this.afa.authState;
  }
  public isLogged = () => {
    return this.userAuthFire != null;
  }
  public isCompletRegister = () => {
    return this.completRegister;
  }
  public user = (): User => {
    return this.userDb;
  }
}
