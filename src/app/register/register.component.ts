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
//     1. Create yourown necessary keys to complete assignment
//     2. Make an application using *url-1 to display following info:Calories and serving weight in grams
//     3. Use Text to speech API using url-2 to speak out the searched keyword
//
// Adapted from https://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
//----------------------------------------------------------------------------------------------------------------*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
