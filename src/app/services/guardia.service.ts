import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { DaoUserService } from '../dao/dao-user.service';

@Injectable({providedIn: 'root'})
export class GuardiaService implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userDAO: DaoUserService) {
    this.auth.authState().subscribe(
      (result) => {
        if ( result && result.uid) {
          this.userDAO.findById(result.uid).then((doc) => {
            if (doc.exists) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/registerData']);
            }
          }).catch((error) => {
            console.log('Error en el guardia:', error);
          });
        } else {
          this.router.navigate([ '/homeLogin' ]);
        }
      },
      (error) => {
        this.router.navigate([ '/' ]);
      });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.auth.isLogged();
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.auth.isLogged();
  }
}