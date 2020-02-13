/*-----------------------------------------------------------------------------------------------------------------
// CS 5551
// Lab 3
// Jonathan Wolfe
// Bill Yerkes
// Create a single page application with login, register and nutrition pages using Angular
// Part 1:
// Login and Register pages:
//     Create login and register pages and implement local storage functionality on the
//     register page. A user needs to login to view the home page with part-2.
// Part 2:
//     1. Create your own necessary keys to complete assignment
//     2. Make an application using *url-1 to display following info:Calories and serving weight in grams
//     3. Use Text to speech API using url-2 to speak out the searched keyword
//
// Adapted from https://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
//----------------------------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
