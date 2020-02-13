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
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
