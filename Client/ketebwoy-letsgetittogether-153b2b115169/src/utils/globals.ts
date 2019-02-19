import {Injectable}      from '@angular/core';
import {Http}            from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {share} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from 'src/models';


export class AppGlobals {
       
    private _isUserLoggedIn = new BehaviorSubject<boolean>(false);
    private _user = new BehaviorSubject<User>(new User());
    private _moduleProfile = new BehaviorSubject<boolean>(false); 
    private _moduleCamp = new BehaviorSubject<boolean>(false); 
    private _observer: any;
    private _userobserver: any;
    private _moduleProfobserver: any; 
    private _moduleCampobserver: any; 
    loggedinstatus$ = this._isUserLoggedIn.asObservable();
    user$ = this._user.asObservable();
    moduleCamp$ = this._moduleCamp.asObservable(); 
    moduleProf$ = this._moduleProfile.asObservable(); 

    localstorage: any;
    storage: Storage;

    constructor() {

        this.loggedinstatus$ =  new Observable(observer => this._observer = observer);
        this.user$ = new Observable(_userobserver => this._userobserver = _userobserver);
        this.moduleCamp$ = new Observable(_moduleCampobserver => this._moduleCampobserver = this._moduleCampobserver); 
        this.moduleProf$ = new Observable(_moduleProfobserver => this._moduleProfobserver = this._moduleProfobserver); 
       
    }



    setloginstatus(isLoggedIn: boolean) {
        this._isUserLoggedIn.next(isLoggedIn);
    }


    setuser(userarg: any) {
        this._user.next(userarg);
    }

    showProfModule(show: boolean) {
        this._moduleProfile.next(show);
    }

    showCampModule(show: boolean) {
        this._moduleCamp.next(show);
    }

}