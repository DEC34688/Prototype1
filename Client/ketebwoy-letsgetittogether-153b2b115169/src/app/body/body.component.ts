import { Component } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationPage} from './pages/authenticationPage';
import {ProfilePage} from './pages/profilePage';
import {CampaignPage } from './pages/campaignPage';
import { AppGlobals } from '../../utils/globals';


import { User } from '../../models';
import { FireBaseData } from '../../services/firebase.service';



@Component({
  selector: 'bodycomp',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  title = 'Lets Get it Together';
  private warningMessage; 
  private error; 
  loggedin: boolean; 
  user: User; 
  moduleProf: boolean = true;
  moduleCamp: boolean = false;;  
  showAuth: boolean; 
  showProfile: boolean; 
  showCampaign: boolean; 
  public icon = 'highlight_off'; 
  fbd: any; 
  // moduleProfSubscription: Subscription;
  // moduleCampSubscription: Subscription;
  // subscription: Subscription;
  // usersubscription: Subscription;


  constructor(
       private authService: AuthenticationService, private modalService: NgbModal, private _globals: AppGlobals
) {
  



}

ngOnInit() {
  // this.subscription = this._globals.loggedinstatus$.subscribe(loggedin => this.loggedin = loggedin);
  // this.usersubscription = this._globals.user$.subscribe(userd => this.user = userd);
  // this.moduleCampSubscription = this._globals.moduleCamp$.subscribe(moduleCamp => this.moduleCamp = moduleCamp);
  // this.moduleProfSubscription = this._globals.moduleProf$.subscribe(moduleProf => this.moduleProf = moduleProf);

}

ngOnDestroy() {
  // this.subscription.unsubscribe();
  // this.usersubscription.unsubscribe();
  // this.moduleProfSubscription.unsubscribe();
  // this.moduleCampSubscription.unsubscribe();
}
  
switchModule() {
  this.moduleProf = !this.moduleProf; 
  this.moduleCamp = !this.moduleCamp;
}
  
  
}
