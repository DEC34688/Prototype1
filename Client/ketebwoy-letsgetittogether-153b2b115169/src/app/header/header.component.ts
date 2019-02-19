import { Component, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { AuthenticationService} from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModal} from './modals/authenticationModal';
import {ProfileModal} from './modals/profileModal'
import {NewCampaignModal } from './modals/newCampaignModal'
import { AppGlobals } from '../../utils/globals';


import { User } from '../../models';



@Component({
  selector: 'headercomp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Lets Get it Together';
  private warningMessage; 
  private error; 
  loggedin: boolean; 
  // moduleProf: boolean;
  // moduleCamp: boolean; 
  user: User; 
  showAuth: boolean; 
  showProfile: boolean; 
  // public icon = 'highlight_off'; 
  // subscription: Subscription;
  // moduleProfSubscription: Subscription;
  // moduleCampSubscription: Subscription;


  constructor(
       private authService: AuthenticationService, private modalService: NgbModal, private _globals: AppGlobals, @Inject(DOCUMENT) document
) {
    this.showAuth = true; 
    this.showProfile = false; 
}

ngOnInit() {
  //this.subscription = this._globals.loggedinstatus$.subscribe(loggedin => this.loggedin = loggedin);
  // this.moduleCampSubscription = this._globals.moduleCamp$.subscribe(moduleCamp => this.moduleCamp = moduleCamp);
  // this.moduleProfSubscription = this._globals.moduleProf$.subscribe(moduleProf => this.moduleProf = moduleProf);
}

ngOnDestroy() {
  //this.subscription.unsubscribe(); 
  // this.moduleProfSubscription.unsubscribe();
  // this.moduleCampSubscription.unsubscribe();
}
  
  login() {
      
    this.authService.login("test","test2")
    .pipe(first())
    .subscribe(
        res => {
            debugger
            // check for errors
            this.warningMessage = '';
            if (Array.isArray(res)) {
                this.warningMessage += res[0];
                
            }
            // if not errors - navigate to home
            if (!this.warningMessage) {
                
              
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
    );

  }

  loadAuth() {
 
      this.modalService.open(AuthenticationModal).result.then((result: any) => {
        this.user = result.res;
        debugger
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('loadProfile', JSON.stringify(result.gotoProfile));
        // this._globals.setuser(this.user);
        // this._globals.setloginstatus(true);
        
        if(result.gotoProfile) {
          this.navBarConfig(1);
          // this._globals.showProfModule(true);
          // this._globals.showCampModule(false);
          this.loadProfile();
        }
        else {
          this.navBarConfig(2);
          // this._globals.showProfModule(false);
          // this._globals.showCampModule(true);
          
        }
      
      }, (reason) => {
        debugger
               alert(JSON.stringify(reason));
      });
  }

  loadProfile() {
      // this.modalService.open(ProfileModal).result.then((result: User) => {
      //   // this.user = result;
      //   // this.showAuth = false; 
      //   // this.showProfile = true; 
      // }, (reason) => {
      //   debugger
      //          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // });
  }

  startCampaign() {
      this.modalService.open(NewCampaignModal,  { size: 'lg', backdrop: 'static' }).result.then((result: User) => {
        // this.user = result;
        // this.showAuth = false; 
        // this.showProfile = true; 
      }, (reason) => {
        debugger
               //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  navBarConfig(selected: any) {
    
    var prof = document.getElementById("prof");
    var camp = document.getElementById("camp");
    var comm = document.getElementById("comm");

    prof.style.color = "white";
    camp.style.color = "white";
    comm.style.color = "white";

    switch (selected) {
      case 1: prof.style.color = "black";
          break;
      case 2: camp.style.color = "black";
          break;
      case 3: comm.style.color = "black";
          break;
      default:
              prof.style.color = "white";
              camp.style.color = "white";
              comm.style.color = "white";
  }
    
    //elenent.style.color = "red;"
  }
  
}
