import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../shared/services/user';
import * as firebase from 'firebase/app';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public afm: AngularFireMessaging
    ) {
      /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
    }
  // Sign in with email/password
 
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  // Sign up with email/password
  public SignUp = (email, pass) => {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      //this.SendVerificationMail();
      //this.SetUserData(result.user);
      this.SendSaveData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }
  FinishSaveData(id, namesp, lastNamep, birthDatep, sexop, typep) {
    const uid = this.afAuth.auth.currentUser.uid;
    this.ngZone.run(() => {
      debugger;
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      const userData: User = {
        identificacion: id,
        names: namesp,
        lastName: lastNamep,
        birthDate: birthDatep,
        sexo: sexop,
        type: typep
      }
      return userRef.set(userData, {
        merge: true
      });
    });
    debugger;
    if (!this.afAuth.auth.currentUser.emailVerified){
      this.SendVerificationMail();
    }else{
      this.router.navigate(['dashboard']);
    }
    
  }
  SendSaveData(user) {
    return this.afm.requestToken
    .subscribe((token) => {
      console.log('Permission granted! Save to the server!', token); 
      this.router.navigate(['save-user-data']);
      this.SetTokenUser(user, token);
    },
      (error) => { console.error(error); },
    );
    
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null /*&& user.emailVerified !== false*/) ? true : false;
  }
  public FacebookAuth = () => {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      this.ngZone.run(() => {
        this.SendSaveData(result.user);
        //this.router.navigate(['dashboard']);
      });
      //this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    });
  }
  SetTokenUser(user, tok) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token: tok
    }
    return userRef.set(userData, {
      merge: true
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
