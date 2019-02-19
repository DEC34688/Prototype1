import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../../models';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { exists } from 'fs';



@Component({
    selector: 'communityPage',
    templateUrl: '/communityPage.html',
    styleUrls: ['/communityPage.scss']
})
export class CommunityPage {
    title = 'Lets Get it Together';
    private warningMessage;
    private error;
    login_name: string;
    login_password: string;
    register_name: string;
    register_email: string;
    register_password: string;
    register_confirmpassword: string;
    user: User;
    editMode: boolean;
    searchText: any;
    products: [];
    results: boolean;
    data: any;


    constructor(
        private prodService: ProductService
    ) {
        debugger
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user) {


        }

    }
    
}
