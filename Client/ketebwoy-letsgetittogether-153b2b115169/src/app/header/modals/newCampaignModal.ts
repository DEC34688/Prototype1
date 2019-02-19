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
//import { exists } from 'fs';



@Component({
    selector: 'get-campaign',
    templateUrl: '/newCampaignModal.html',
    styleUrls: ['/newCampaignModal.scss']
})
export class NewCampaignModal {
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
    public files: UploadFile[] = [];
    products: [];
    results: boolean;
    data: any;
    columnDefs = [
		{headerName: 'Source', field: 'url' },
		{headerName: 'Item', field: 'name' },
        {headerName: 'Price', field: 'price'},
        {headerName: 'Image', field: 'imageURL'}
	];

	rowData = [
		
    ];
    

    constructor(
        private prodService: ProductService, public activeModal: NgbActiveModal
    ) {
        debugger
        this.editMode = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user) {


        }

    }
    public toggleEdit() {
        this.editMode = !this.editMode;
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
                          if(cont) {
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
