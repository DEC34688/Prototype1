import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";
import { User } from '../models';

@Injectable({ providedIn: "root" }) // luis test added
export class AuthenticationService extends BaseService {
    private headers: HttpHeaders;
    private baseUrl: string = 'http://localhost:5001';
    //private baseUrl: string = 'https://letsgetittogether.azurewebsites.net';
    
    constructor(private http: HttpClient, private configService: ConfigService) {
        super();

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        //this.baseUrl = configService.getApiURI();
        
        debugger;
    }

    login(email: string, password: string) {
        debugger
        let body = JSON.stringify( { Username: email, Password: password });
        const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
        httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
        var identityURL =  "Accounts/token";
        

        var user = new User();
        user.firstName = "Keith";
        user.lastName = "Drummond";
        user.email = "keith@VividCoding.com";
        user.token = '23d34ufbwi3urhfuiwhrrfiuvwrjfvw';
        //return user; 

        ///TODO GET HTTP REQUESTS TO WORK 
        return this.http.post<any>(this.baseUrl + "/v2/token", body, httpOptions).pipe(
               map(user => {
                   return user;
                })
            );            
    }

    register (
        FirstName               : string,
        LastName                : string,
        Email                   : string,
        Phone                  : string,
        Password                : string,
        PasswordConfirmation    : string
    ){

        // let body = JSON.stringify({ FirstName: FirstName, LastName: LastName, Email: Email, Phone: Phone, Password:Password, PasswordConfirmation:PasswordConfirmation});
        // let body = {
        //     "FirstName": FirstName,
        //     "LastName": LastName,
        //     "Email": Email,
        //     "UserName": Email,
        //     "Password": Password,
        //     "PasswordConfirmation": PasswordConfirmation,
        //     "Phone": Phone
            
        //     };

        let body = {
            "FirstName": "Test",
            "LastName": "User",
            "Email": "Test1@Test.com",
            "UserName": "Test1@Test.com",
            "Phone": "5555555555"
            
            }
      
        const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
        httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
        
        return this.http.post<any>(this.baseUrl + "/v2/register", body, httpOptions);
        
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem("currentUser");
    }

    /* sendPasswordResetEmail(email: string): Observable<any> {
        let url = this.baseUrl + "/reset-password";
        return this.http
            .post(
                this.apiUrl + "/password-reset-email",
                { email: email, url: url },
                
            )
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    } */
}