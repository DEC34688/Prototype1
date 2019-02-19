import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../../models';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Profile} from '../../../models/profile';
import { FireBaseData } from 'src/services/firebase.service';


@Component({
  selector: 'profilePage',
  templateUrl: '/profilePage.html',
  styleUrls: ['/profilePage.scss']
})
export class ProfilePage {
  title = 'Lets Get it Together';
  private warningMessage;
  private error;
  profile: Profile = new Profile; 
  login_name: string;
  login_password: string;
  register_name: string;
  register_email: string;
  register_password: string;
  register_confirmpassword: string;
  user: User;
  editMode: boolean;
  public files: UploadFile[] = [];
  imageData: any; 
  imageUrl: string; 
  profileType: any;
  profileImage: any;
  ccnum: string; 
  cvc: string;
  ccexpMonth: any;
  ccexpYear: any; 
  addressline1: string;
  addressline2: string;
  city: string;
  state: string;
  zip: string; 
  nickname: string;
  type: string;
  image: string; 
  //imageUpload is the name of the reactive form
  acceptedImageTypes = {'image/png': true,'image/jpeg': true,'image/gif': true};
  fbd: any;


  constructor(

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
    // this.editMode = false; 
    // this.user = JSON.parse(localStorage. getItem('user'));
    // if (this.user) {


    // }

  }
  public getFileData(file: File) {
    
      // Is it a file?
      if (file.size > 0) {
        debugger
         alert(JSON.stringify({path: file.name, size: file.size}));
         var myReader:FileReader = new FileReader();
       
        myReader.onloadend = (e) => {
          this.imageData = JSON.stringify(myReader.result);
          localStorage.setItem('imageData', this.imageData);
          this.imageUrl = this.imageData;

          var image = new Image();
          image.src = JSON.stringify(myReader.result);
    
          image.width = 50; 
          

         
        }
        myReader.readAsDataURL(file);

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

        }
       else {
        // It was a directory (empty directories are added, otherwise only files)
      
      }
  }


  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public saveProfile() {

    var profMod = this.profile;
    profMod.type = this.profileType;
    profMod.addressline1 = this.addressline1;
    profMod.addressline2 = "";

    if( profMod.addressline2 == null) 
    {
      profMod.addressline1 = "";
    }
    profMod.city = this.city;
    profMod.state = this.state;
    profMod.zip = this.zip;
    profMod.ccnum = this.ccnum;
    profMod.cvc = this.cvc;
    profMod.ccexpdate = this.ccexpMonth + "/" + this.ccexpYear;
    
    if(this.imageData != null) {
      profMod.image = JSON.stringify(this.imageData[0].preview);
     // alert(JSON.stringify(profMod));
      //debugger
    
    }

    this.fbd.uploadProfile(profMod).then((res: any) => {
      if(res != '') {
      alert(JSON.stringify("profile Saved"));
        
    }
  });
    //profMod.image =   this.getFileData(this.imageData);

    //get imageData 
   

}
  }
