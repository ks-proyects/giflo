import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * This class intercept route change and check for security
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
    ) { }

    /**
     * Check routes permission
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // Return observable
        return new Observable<boolean>((ob: any) => {
            this.afAuth.user.subscribe(user => {
                // Get logged user
                if (user) {
                    ob.next(true);
                } else {
                    ob.next(false);
                    this.router.navigate(['/authentication/login']);
                }
            });
        });
    }

}
