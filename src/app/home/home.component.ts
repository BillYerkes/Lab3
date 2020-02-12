import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    item;

    constructor(
        private http: HttpClient,
    ) { }

    ngOnInit() {
    }

    searchItem() {
        //https://api.nutritionix.com/v1_1/search/McDouble?results=0:1&fields=*&appId=45876827&appKey=5e64cf8b4630c5929e1c40949be9290e
        const base = 'https://api.nutritionix.com/v1_1/search/';
        const food = 'McDouble' + '?results=0:1&fields=*';
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
