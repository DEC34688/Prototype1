import { Component } from '@angular/core';
import { AuthenticationService} from '../services/authentication.service';
import { ProductService} from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lets Get it Together';
  private warningMessage; 
  private error; 

  constructor(
       private authService: AuthenticationService, private prodService: ProductService, private modalService: NgbModal
) {}
  
 

  loadAuth() {
    //   alert("on click works");
    //   this.modalService.open(AuthenticationModal).result.then((result) => {
    //     //this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });
  }
}
