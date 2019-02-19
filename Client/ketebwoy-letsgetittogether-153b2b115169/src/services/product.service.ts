import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";
import { User } from '../models';

@Injectable({ providedIn: "root" }) // luis test added
export class ProductService extends BaseService {
    private baseUrl: string = 'http://localhost:5001/shop';
    //private baseUrl: string = 'https://letsgetittogether.azurewebsites.net';
    
    constructor(private http: HttpClient, private configService: ConfigService) {
        super();

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        //this.baseUrl = configService.getApiURI();
        
        debugger;
    }

    generalSearch(searchItem: string) {
        debugger
      
        
        var identityURL =  "Accounts/token";
        let params = new HttpParams().set('search', searchItem);
        return this.http.get(this.baseUrl + '/products?search=' + searchItem);
        
     
       // return this.http.request("GET",this.baseUrl + productURL,{responseType:"json",body});
      // return this.getJSON();
        
            
    }
    public getJSON(): Observable<any> {
        return this.http.get("./assets/sampleprodlist.txt")
    }




}