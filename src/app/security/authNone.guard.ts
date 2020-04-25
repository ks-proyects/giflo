import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * This class intercept route change and check for security
 */
@Injectable()
export class AuthNoneGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return new Observable<boolean>((ob: any) => {
            this.afAuth.user.subscribe(user => {
                if (user) {
                    ob.next(true);
                    this.router.navigate(['/home/index']);
                } else {
                    ob.next(false);
                    this.router.navigate(['/landing']);
                }
            });
        });
    }
}
