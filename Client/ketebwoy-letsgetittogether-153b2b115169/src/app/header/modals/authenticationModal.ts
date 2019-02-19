import { Component } from '@angular/core';
import { AuthenticationService} from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'log-in',
  templateUrl: '/authenticationModal.html',
  styleUrls: ['/authenticationModal.scss']
})
export class AuthenticationModal {
  title = 'Lets Get it Together';
  private warningMessage; 
  private error; 
  login_name: string;
  login_password: string; 
  register_name: string; 
  register_email: string; 
  register_password: string;
  register_confirmpassword: string; 
  register_phone: string;


  constructor(
       private authService: AuthenticationService, public activeModal: NgbActiveModal
) {
    
}
  
  login(login_name: string, login_password: string) {
      debugger
   var user =  this.authService.login(login_name,login_password).subscribe(
        res => {
            this.warningMessage = '';
            if (Array.isArray(res)) {
                this.warningMessage += res[0];
               alert('admin : ' + this.warningMessage);
            }
            // if not errors - navigate to home
            if (!this.warningMessage) {
              if (res.id) {
                this.onClose({res: res, gotoProfile: false});
              }
               
            }
        },
        error => {
            debugger
            console.log('luis : failed to login');
            this.warningMessage = "Invalid Credentials!";
            this.error = JSON.stringify(error.message);
         //   this.loading = false;
            console.error(error);
        }

  //  if (user.token) {
  //      debugger
  //      this.onClose(user); 
  //  }
   
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
     );

  }

  register(register_firstname, register_lastname, register_password, register_confirmpassword, register_email, register_phone) {
      this.authService.register(register_firstname, register_lastname, register_password, register_confirmpassword, register_phone, register_email).subscribe(
        res => {
            this.warningMessage = '';
            if (Array.isArray(res)) {
                this.warningMessage += res[0];
               alert('admin : ' + this.warningMessage);
            }
            // if not errors - navigate to home
            if (!this.warningMessage) {
                alert(res);
                debugger
                this.onClose({res: res, gotoProfile: true});
               
            }
        },
        error => {
            debugger
            this.onClose("");
            console.log('luis : failed to login');
            this.warningMessage = "Invalid Credentials!";
            this.error = JSON.stringify(error.message);
         //   this.loading = false;
            console.error(error);
        }

  )}

 

  onClose(data: any):void {
    this.activeModal.close(data);
    }
        
    onDismiss(data : any):void {
    this.activeModal.dismiss(data);
    }
}
