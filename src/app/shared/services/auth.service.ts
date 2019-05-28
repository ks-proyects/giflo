import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user';
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
  /**
   * Loggin with email and pass
   * @param email
   * @param password
   */
  public loginWithEmailPass = (email, password) => {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.SendSaveData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  /**
   * Loggin with facebook
   */
  public loginWithFacebook = () => {
    return this.WithPopup(new firebase.auth.FacebookAuthProvider());
  }
  /**
   * Loggin with Google
   */
  public loginWithGoogle = () => {
    return this.WithPopup(new firebase.auth.GoogleAuthProvider());
  }
  /**
   * Loggin with provider
   */
  private WithPopup = (provider) => {
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      this.ngZone.run(() => {
        this.SendSaveData(result.user);
      });
    }).catch((error) => {
      window.alert(error);
    });
  }
  /**
   * Registrase con el email y password
   */
  public registerByEmailPass = ( email, pass) => {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((result) => {
      this.SendSaveData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  private SendSaveData = (user) => {
    return this.afm.requestToken.subscribe((token) => {
      this.afs.collection<User>('users').doc(this.afAuth.auth.currentUser.uid).ref.get().then((doc) => {
        if (doc.exists) {
          this.updateToken(user, token);
          if (!this.afAuth.auth.currentUser.emailVerified) {
            this.sendVerificationMail();
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']);
            });
          }
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['save-user-data']);
          });
          this.setTokenUser(user, token);
        }
      }).catch((error) => {
        window.alert(error.message);
      });
      console.log('Permission granted! Save to the server!', token);
    },
      (error) => {window.alert(error.message); },
    );
  }

  sendVerificationMail = () => {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  finishSaveData = (id, namesp, lastNamep, birthDatep, sexop, typep) => {
    const uid = this.afAuth.auth.currentUser.uid;
    this.ngZone.run(() => {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      const userData: User = {
        identificacion: id,
        names: namesp,
        lastName: lastNamep,
        birthDate: birthDatep,
        sexo: sexop,
        type: typep
      };
      return userRef.set(userData, {
        merge: true
      });
    });
    if (!this.afAuth.auth.currentUser.emailVerified){
      this.sendVerificationMail();
    } else {
      this.router.navigate(['dashboard']);
    }
  }
  /**
   * Método cuando se olvida el password
   */
  public forgotPassword = (passwordResetEmail) => {
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
  private setTokenUser = (user, tok) => {
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
  private updateToken = (user, tok) => {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      token: tok
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  public logout = () => {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
