import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) {}
  public loginFacebook = () => {
    return this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  public logout = () => {
    return this.auth.auth.signOut();
  }

  public isLogged = () =>{
    return this.auth.authState;
  }

}
