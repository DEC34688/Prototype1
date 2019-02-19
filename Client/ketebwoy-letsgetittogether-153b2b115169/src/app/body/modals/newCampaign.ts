import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../../models';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {Campaign} from '../../../models/campaign';
import { FireBaseData } from 'src/services/firebase.service';
//import { exists } from 'fs';



@Component({
    selector: 'get-campaign',
    templateUrl: '/newCampaign.html',
    styleUrls: ['/newCampaign.scss']
})
export class NewCampaignMod {
    title = 'Lets Get it Together';
    private warningMessage;
    private error;
    campaignTitle: any;
    campaignType: any;
    startDate: any;
    endDate: any; 
    fundingAmount: any;
    fundingProductURL: any; 
    fundingProductImageURL: any;
    theme: any;
    login_name: string;
    login_password: string;
    register_name: string;
    register_email: string;
    register_password: string;
    register_confirmpassword: string;
    themePath: any;
    user: User;
    editMode: boolean;
    searchText: any;
    public files: UploadFile[] = [];
    products: [];
    results: boolean;
    data: any;
    campaignObj: Campaign; 
    welcomeMessage: any; 
    BoosterMessage: any;
    fbd: any;
    columnDefs = [
        { headerName: 'Source', field: 'url' },
        { headerName: 'Item', field: 'name' },
        { headerName: 'Price', field: 'price' },
        { headerName: 'Image', field: 'imageURL' }
    ];

    rowData = [

    ];


    constructor(
        private prodService: ProductService, public activeModal: NgbActiveModal
    ) {
        this.fbd = new FireBaseData(); 

        this.user = {
          id: 21,
          lastName: 'Drummond',
          cellphone: '5555555555',
          email: 'keith@vividcoding.com',
          firstName: "Keith",
          token: "",
          password: "Seattlesnows!"
      
        }; 


        this.editMode = false;
        this.themePath = 'http://www.craig-group.com/assets/cache/images/uploads/charity-search_790_400_s_c1.png';
       
        

    }

    saveCampaign() {
        var campaignObject = {
            theme: this.themePath,
            startDate: this.startDate,
            endDate: this.endDate,
            fundingAmount: this.fundingAmount,
            fundingProductImageURL: this.fundingProductImageURL,
            fundingProductURL: this.fundingProductURL,
            welcomeMessage: this.welcomeMessage,
            userid: 21
        };

        this.campaignObj = {
            theme: this.themePath,
            startDate: this.startDate,
            endDate: this.endDate,
            fundingAmount: this.fundingAmount,
            fundingProductImageURL: this.fundingProductImageURL,
            fundingProductURL: this.fundingProductURL,
            welcomeMessage: this.welcomeMessage,
            user: this.user,
            title: this.campaignTitle
        };

        this.fbd.uploadProfile(campaignObject).then((res: any) => {
            if(res != '') {
            alert(JSON.stringify("campaign Saved"));
            this.fbd.sendemail(campaignObject);
            this.onClose(this.campaignObj);
          } });
    
        

     
    }

    public toggleEdit() {
        this.editMode = !this.editMode;
    }


    changeTheme(newTheme) {
        var back2school = "https://www.leadingauthorities.com/uploads/3/c/a/2/6/1/3ca26196b2346b2d4f0c679b46ae1aac/the-circuit-back-to-school.details.jpg";
        var charity = "http://www.craig-group.com/assets/cache/images/uploads/charity-search_790_400_s_c1.png";
        var electronics = "https://images.prod.meredith.com/content/281474979809269/544056";
        var retail = "http://insights.marinsoftware.com/wp-content/uploads/2013/08/onlineretail2.jpg"; 

        switch (newTheme) {

            case "charity":
            this.themePath = charity;
                break;
            case "backToSchool":
            this.themePath = back2school;
                break;
            case "electronics":
            this.themePath = electronics;
                break;
            case "retail":
            this.themePath = retail;
                break;
            default:



        }
    }

    updateImage() {
        this.fundingProductImageURL = this.fundingProductImageURL; 
    }

    loadSettings(user: User) {
        debugger

        //    if (user.token) {
        //        debugger
        //        this.onClose(user); 
        //    }

        ///TODO GET HTTP REQUESTS TO WORK 
        // .subscribe(
        //     res => {
        //         debugger           // check for errors
        //         this.warningMessage = '';
        //         if (Array.isArray(res)) {
        //             this.warningMessage += res[0];
        //            alert('admin : ' + this.warningMessage);
        //         }
        //         // if not errors - navigate to home
        //         if (!this.warningMessage) {
        //          //   alert("admin : navigation after successful login");
        //           //  this.router.navigateByUrl('/apps/dashboards/analytics');
        //         }
        //     },
        //     error => {
        //         debugger
        //         console.log('luis : failed to login');
        //         this.warningMessage = "Invalid Credentials!";
        //         this.error = JSON.stringify(error.message);
        //      //   this.loading = false;
        //         console.error(error);
        //     }
        // );

    }



    onClose(data: any): void {
        this.activeModal.close(data);
    }

    onDismiss(data: any): void {
        this.activeModal.dismiss(data);
    }
    public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
           
                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })
           
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }

    startSearch() {
        var searchitem = this.searchText;
        this.prodService.generalSearch(searchitem).subscribe(
            res => {
                //if (res.total_results_count > 0) {
                if (res) {
                    this.results = true;
                    this.data = res;
                    var resSet = <any>[];
                    var cont = true;

                    for (let site of this.data.results) {
                        if (cont) {
                            var product = { name: '', url: '', imageURL: '', price: '' };
                            product.name = site.name;

                            product.price = site.price

                            if (site.images[0]) {
                                product.imageURL = site.images[0];
                            }

                            if (site.sitedetails[0]) {
                                product.url = site.sitedetails[0].url;
                            }

                            if (resSet.length < 11) {
                                resSet.push(product)
                                cont = true;
                            }
                            else {
                                cont = false;
                            }

                        }

                    }
                    debugger
                    this.products = resSet;
                    this.rowData = resSet;


                }
            },
            error => {
                debugger
                console.log('luis : failed to login');
                this.warningMessage = "Invalid Credentials!";
                this.data = null;
                this.error = JSON.stringify(error.message);
                //   this.loading = false;
                console.error(error);
            }
        );





    }

}
