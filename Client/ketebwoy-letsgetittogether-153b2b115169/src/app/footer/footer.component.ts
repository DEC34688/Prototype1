import { Component } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import {AuthenticationModal} from './modals/authenticationModal';
// import {ProfileModal} from './modals/profileModal'

import { User } from '../../models';



@Component({
  selector: 'foot',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  title = 'Lets Get it Together';
  private warningMessage; 
  private error; 
  loggedin: boolean; 
  user: User; 
  showAuth: boolean; 
  showProfile: boolean; 
  public icon = 'highlight_off'; 


  constructor(
      
) {
   
}
  
//   login() {
      
//     this.authService.login("test","test2")
//     // .pipe(first())
//     // .subscribe(
//     //     res => {
            
//     //         // check for errors
//     //         this.warningMessage = '';
//     //         if (Array.isArray(res)) {
//     //             this.warningMessage += res[0];
//     //             console.log('luis : ' + this.warningMessage);
//     //         }
//     //         // if not errors - navigate to home
//     //         if (!this.warningMessage) {
//     //             console.log("luis : navigation after successful login");
//     //           //  this.router.navigateByUrl('/apps/dashboards/analytics');
//     //         }
//     //     },
//     //     error => {
//     //         debugger
//     //         console.log('luis : failed to login');
//     //         this.warningMessage = "Invalid Credentials!";
//     //         this.error = JSON.stringify(error.message);
//     //      //   this.loading = false;
//     //         console.error(error);
//     //     }
//     // );

//   }

//   loadAuth() {
 
//       this.modalService.open(AuthenticationModal).result.then((result: User) => {
//         this.user = result;
//         debugger
//         localStorage.setItem('user', JSON.stringify(this.user));
        
//         this.showAuth = false; 
//         this.showProfile = true; 
//       }, (reason) => {
//         debugger
//                //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//   }

//   loadProfile() {
//       this.modalService.open(ProfileModal).result.then((result: User) => {
//         // this.user = result;
//         // this.showAuth = false; 
//         // this.showProfile = true; 
//       }, (reason) => {
//         debugger
//                //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//   }
}
