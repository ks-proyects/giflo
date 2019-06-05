import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user';
import * as firebase from 'firebase/app';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as Rx from 'rxjs';
import { UserDaoService } from 'src/app/dao/user-dao.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  userDB: User;
  subject = new Rx.BehaviorSubject({});
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public afm: AngularFireMessaging,
    private userDao: UserDaoService
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          this.userDao.findById(this.afAuth.auth.currentUser.uid).then((doc) => {
            if (doc.exists) {
              this.saveLocalUserDB(doc.data());
            } else {
              this.saveLocalUserDB(null);
            }
          }).catch((error) => {
            window.alert(error.message);
          });
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
      this.sendSaveData(result.user);
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
      this.sendSaveData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }
  /**
   * Registrase con el email y password
   */
  public registerByEmailPass = ( email, pass) => {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((result) => {
      this.sendSaveData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  public sendSaveData = (user) => {
    return this.userDao.findById(this.afAuth.auth.currentUser.uid).then((doc) => {
      if (doc.exists) {
        this.afm.requestToken.subscribe(
          (token) => {
            console.log('Permiso consedido y se guarda en el servidor!');
            this.updateToken(user, token);
            this.afm.messages.subscribe((message) => {
              this.subject.next(message);
            });
            this.afm.messaging.subscribe((message) => {
                this.subject.next(message);
            });
          },
          (error) => {
            window.alert(error.message);
          },
        );
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['sign-up-data']);
        });
      }
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  finishSaveData = (id, namesp, lastNamep, birthDatep, sexop, typep, phone, convetional) => {
    this.afm.requestToken.subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
        this.afm.messages.subscribe((message) => {
          this.subject.next(message);
        });
        this.afm.messaging.subscribe((message) => {
            this.subject.next(message);
        });
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.saveUserData(this.afAuth.auth.currentUser, token, id, namesp, lastNamep, birthDatep, sexop, typep ,phone, convetional);
      },
      (error) => {
        window.alert(error.message);
      },
    );
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
  get isRgister(): boolean {
    const userDB = JSON.parse(localStorage.getItem('userDB'));
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && userDB !== null) ? true : false;
  }
  private saveUserData = (user, tok, ID, pnames, pLastName, pBirthDate, pSexo, pType, phonep, convetionalP) => {
    const userRef: AngularFirestoreDocument<User> = this.userDao.findByIdRef(user.uid);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token: tok,
      identificacion: ID,
      names: pnames,
      lastName: pLastName,
      birthDate: pBirthDate ? pBirthDate : '',
      sexo: pSexo ? pSexo : '',
      type: pType,
      phone: phonep,
      convetional: convetionalP
    };
    this.saveLocalUserDB(userData);
    return userRef.set(userData, {
      merge: true
    });

  }
  private updateToken = (user, tok) => {
    const userRef: AngularFirestoreDocument<any> = this.userDao.findByIdRef(user.id);
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
      localStorage.removeItem('userDB');
      this.router.navigate(['sign-in']);
    });
  }
  saveLocalUserDB(userDB) {
    this.userDB = userDB;
    localStorage.setItem('userDB', JSON.stringify(this.userDB));
    JSON.parse(localStorage.getItem('userDB'));
  }
}
