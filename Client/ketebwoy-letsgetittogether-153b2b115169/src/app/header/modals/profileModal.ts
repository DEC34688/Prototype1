import { Component } from '@angular/core';
import { AuthenticationService} from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../../utils/config.service';
import { first } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../../models';
import { Profile } from '../../../models/profile';
import { CC } from '../../../models/cc';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
 


@Component({
  selector: 'get-profile',
  templateUrl: '/profileModal.html',
  styleUrls: ['/profileModal.scss']
})
export class ProfileModal {
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
  profile: Profile;
  cc: CC;
  editMode: boolean;
  public files: UploadFile[] = [];
  type: boolean = false;

  constructor(
       private authService: AuthenticationService, public activeModal: NgbActiveModal
) {
    debugger
    this.editMode = false; 
    this.user = JSON.parse(localStorage. getItem('user'));
    var loadProfile = JSON.parse(localStorage. getItem('loadProfile'));

    if (loadProfile) {
       this.toggleEdit();
        
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

 

  onClose(data: any):void {
    this.activeModal.close(data);
    }
        
    onDismiss(data : any):void {
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
     
      public fileOver(event){
        console.log(event);
      }
     
      public fileLeave(event){
        console.log(event);
      }
    
}
