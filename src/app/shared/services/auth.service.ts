import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as Rx from 'rxjs';
import { LocationService } from './location.service';
import { User} from '../model/user';
import { UserService } from '../datasource/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  userDB: User;
  subject = new Rx.BehaviorSubject({});
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afm: AngularFireMessaging,
    private ds: UserService,
    private location: LocationService
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          this.ds.findByIdUser(this.afAuth.auth.currentUser.uid).then((doc) => {
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
    return this.ds.findByIdUser(this.afAuth.auth.currentUser.uid).then((doc) => {
      if (doc.exists) {
        this.location.getLocation();
        this.afm.requestToken.subscribe(
          (token) => {
            console.log('Permiso consedido y se guarda en el servidor!');
            this.ds.updateToken(user, token);
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
          this.router.navigate(['home']);
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
  finishSaveData = (user: User) => {
    
    this.afm.requestToken.subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
        user.token = token;
        this.afm.messages.subscribe((message) => {
          this.subject.next(message);
        });
        this.afm.messaging.subscribe((message) => {
            this.subject.next(message);
        });
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        user.email = this.afAuth.auth.currentUser.email;
        user.urlPhoto = this.afAuth.auth.currentUser.photoURL;
        this.saveLocalUserDB(user);
        this.ds.saveUserData(this.afAuth.auth.currentUser, user);
        this.location.getLocation();
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
  /**
   * tru si existe el usuario
   */
  get isRgister(): boolean {
    const userDB = JSON.parse(localStorage.getItem('userDB'));
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && userDB !== null) ? true : false;
  }
  public logout = () => {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userDB');
      this.router.navigate(['sign-in']);
    });
  }
  saveLocalUserDB = (userDB) => {
    this.userDB = userDB;
    localStorage.setItem('userDB', JSON.stringify(this.userDB));
    JSON.parse(localStorage.getItem('userDB'));
  }
}
