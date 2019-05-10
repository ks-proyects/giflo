import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn: 'root'})
export class GuardiaService implements CanActivate,CanActivateChild {

  
  loggedIn: any = false;
  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.isLogged().subscribe(
      (result) => {
        if ( result && result.uid) {
          this.loggedIn = true;
          this.router.navigate([ '/' ]);
        } else {
          this.loggedIn = false;
          this.router.navigate([ '/login' ]);
        }
      },
      (error) => {
        this.loggedIn = false;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedIn;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedIn;
  }
}