import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        console.log('ray : here is AuthGuard');

        // not logged in so redirect to login page with the return url
        // ray test navigation to login 
        this.router.navigate(['/pages/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}