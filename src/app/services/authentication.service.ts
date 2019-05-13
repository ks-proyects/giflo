import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: any = false;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(
      (result) => {
        if ( result && result.uid) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      },
      (error) => {
        this.loggedIn = false;
      });
  }
  public loginFacebook = () => {
    return this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  public loginWithGoogle = () => {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public loginWithEmailAndPass = (email, pass) => {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public registerWithFacebook = () => {
    return this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  public registerWithGoogle = () => {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public registerWithEmailAndPass = (email, pass) => {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }
  public logout = () => {
    return this.auth.auth.signOut();
  }
  public authState = () => {
    return this.auth.authState;
  }
  public isLogged = () => {
    return this.loggedIn;
  }
  public user = () => {
    return this.auth.user;
  }
}
