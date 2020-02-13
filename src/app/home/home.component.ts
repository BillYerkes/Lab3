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
//-----------------------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//-------------------------------------------------------------------------------------------------
// HomeComponent:
//
// Creates the home page which prompts users to enter a food items, then uses text-to-speech to
// say the entry and returns the amount of calories in a serving and the weight of a serving of
// the entered food.
//-------------------------------------------------------------------------------------------------
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    foodForm: FormGroup;
    item;

    //-------------------------------------------------------------------------------------------------
    // constructor:
    //
    // Initialized http to route between components and formBuilder to create a web form
    //-------------------------------------------------------------------------------------------------
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    //-------------------------------------------------------------------------------------------------
    // ngOnInit:
    //
    // Initialized the foodForm and the elements used within the form
    //-------------------------------------------------------------------------------------------------
    ngOnInit() {
        this.foodForm = this.formBuilder.group({
            FoodItem: ['', Validators.required]
        });
    }

    //-------------------------------------------------------------------------------------------------
    // OnSubmit:
    //
    // When the search button is clicked on the food form, the value of the text field is sent to
    // api.nutritionix.com to retrieve the nutritional info for the first item found and displayed on
    // the screen.
    //-------------------------------------------------------------------------------------------------
    onSubmit() {
        const base = 'https://api.nutritionix.com/v1_1/search/';
        const food = this.foodForm.controls.FoodItem.value + '?results=0:1&fields=*';
        const appID = '&appId=45876827';
        const apiKey = '&appKey=5e64cf8b4630c5929e1c40949be9290e';
        this.http.get(base + food + appID + apiKey)
            .subscribe((data: any) => this.item = {
                name: data.hits[0].fields.item_name,
                calories:  data.hits[0].fields.nf_calories,
                weight: data.hits[0].fields.nf_serving_weight_grams
            });
    }
}
