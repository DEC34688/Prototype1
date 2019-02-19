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
import { CampaignGridCommandComponent } from '../gridTemplates/campaignGridCommand-component';
import { NewCampaignMod } from '../modals/newCampaign';
//import { exists } from 'fs';



@Component({
    selector: 'campaignPage',
    templateUrl: '/campaignPage.html',
    styleUrls: ['/campaignPage.scss']
})
export class CampaignPage {
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
    columnDefs: any; 
    rowData: any;


    constructor(
        private prodService: ProductService, private modalService: NgbModal
    ) {
        this.columnDefs = [
            {headerName: 'Campaign Name', field: 'name', width: 180},
            {headerName: 'Status', field: 'status', width: 180},
            {headerName: 'Funding Goal', field: 'goal', width: 180},
            {headerName: 'Donation Total', field: 'donations', width: 180},
            {headerName: 'Start Date', field: 'start', width: 180},
            {headerName: 'End Date', field: 'end', width: 180}
            ,{headerName: "Command", field: "value", cellRendererFramework: CampaignGridCommandComponent, colId: "params", width: 180 }
        ];
    
        this.rowData = [
            {name: 'School Books for John', status: 'funding', goal: 450, donations: 75, start: '01/01/2019', end: '04/04/2019'},
            {name: 'Iphone for Mom', status: 'funding', goal: 800, donations: 650, start: '11/01/2018', end: '03/01/2019'},
            {name: 'Water Heater for Shannon', status: 'not started', goal: 1000, donations: 0, start: '03/01/2019', end: '06/01/2019'},
            {name: 'Laptop for Tiffany', status: 'funded', goal: 450, donations: 450, start: '06/01/2018', end: '09/01/2018'}

            
        ];

        debugger
        this.editMode = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user) {


        }

    }

    public newCampaign() {
        this.modalService.open(NewCampaignMod,  { size: 'lg', backdrop: 'static' }).result.then((result: any) => {
            alert("campaign created: " + JSON.stringify(result));
          }, (reason) => {
            debugger
                   //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
    }
    
}
