import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    // ray test
    // getAll() {
    //     console.log("ray : user.services.ts getAll called");
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }
}