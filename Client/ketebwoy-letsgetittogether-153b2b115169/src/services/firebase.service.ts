import { Injectable } from '@angular/core';
import * as moment from 'moment'; 
import { User } from 'src/models';
import { promise } from 'protractor';
import { Campaign } from 'src/models/campaign';



// firebase
declare var firebase: any;
declare var cordova: any;
var storageRef = firebase.storage();

@Injectable()
export class FireBaseData {

  public user: User;
  public userProfile: any;
  public campaign: any; 
  file: any;
  imagestorage: any;
  public userdata: any;
  public userProfdata: any;
  public userCampData: any;

  //public settingsdata: any;
  //public settingsobj: any;  

  public usersettings: any;


  constructor() {
    this.user = {
      id: 21,
      lastName: 'Drummond',
      cellphone: '5555555555',
      email: 'keith@vividcoding.com',
      firstName: "Keith",
      token: "",
      password: "Seattlesnows!"
  
    }; 
    // this.settingsobj = new Settings(); 
    // var rec = firebase.storage();
    // var recref = rec.ref();
    // this.recordstorage = recref.child("record/");
      this.userProfdata = firebase.database().ref(); //.child('profiles');
      this.userCampData = firebase.database().ref('campaigns');
    // this.userrecs = firebase.database().ref('records');
    // this.usersettings = firebase.database().ref('settings');
  }

  // ///////////////////////////////////////////////CRUD OPERATIONS////////////////////////////////////////////////////////////
  public uploadProfile(profile: any) {

    return new Promise((resolve, reject) => {
    var newPostKey = this.userProfdata.push().key;
// Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/profiles/' + newPostKey] = profile;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    this.userProfdata.update(updates);
        resolve(newPostKey);     
        });
  }

  
  public sendemail(campaign: any) {
    
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
     alert("attempting to send Email");
    
  }
  

  public uploadCamp(camp: any) {

    return new Promise((resolve, reject) => {
    var newPostKey = this.userCampData.push().key;
// Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/campaigns/' + newPostKey] = camp;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
   // this.sendemail(camp);
    this.userCampData.update(updates);
        
        resolve(newPostKey);     
        });

       
  }
  // public uploadrecording(file: any, blob: any) {
  //   // return new Promise((resolve, reject) => {
  //   //   //alert("firebase upload: " + JSON.stringify(blob));

  //   //   // Create file metadata including the content type
  //   //   // StorageMetadata metadata = new StorageMetadata.Builder()
  //   //   //   .setContentType("image/jpg")
  //   //   //   .build();

  //   //   var uploadTask = this.recordstorage.child(file).put(blob);

  //   //   // Listen for state changes, errors, and completion of the upload.
  //   //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //   //     function (snapshot) {

  //   //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //   //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   //       //  console.log('Upload is ' + progress + '% done' + ": " + snapshot.bytesTransferred + " / " + snapshot.totalBytes);
  //   //       switch (snapshot.state) {
  //   //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //   //           console.log('Upload is paused');
  //   //           break;
  //   //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //   //           console.log('Upload is running');
  //   //           alert("media uploading to firebase");
  //   //           break;
  //   //       }
  //   //     }, function (error) {
  //   //       switch (error.code) {
  //   //         case 'storage/unauthorized':
  //   //           reject(error);
  //   //           //console.log(JSON.stringify(error));
  //   //           break;

  //   //         case 'storage/canceled':
  //   //           reject(error);
  //   //           //console.log(JSON.stringify(error));
  //   //           // //alert("cancelled: " + error.serverResponse);
  //   //           // User canceled the upload
  //   //           break;


  //   //         case 'storage/unknown':
  //   //           //console.log(JSON.stringify(error));
  //   //           reject(error);
  //   //           ////alert("error: " + JSON.stringify(error));
  //   //           // Unknown error occurred, inspect error.serverResponse
  //   //           break;
  //   //       }
  //   //     }, function () {

  //   //       // Upload completed successfully, now we can get the download URL
  //   //       var downloadURL = uploadTask.snapshot.downloadURL;
  //   //       resolve(true);
  //   //     });
  //   // });

  // }

  // public user2recording(file: any, user: any) {
  //   //alert("made it to record user association");
  //   return new Promise((resolve, reject) => {
  //     var rec = new RecordInfo(user, file);
  //     //alert(JSON.stringify(rec));
  //     var urref = this.userrecs.push(rec);
  //     var key = urref.key();
  //     rec.recid = key; 

  //     this.userrecs.push(rec); 
  //     resolve(rec);     
  //   });

  // }

  // public updateuser2recording(rec: any) {
  //   rec.datemodified = moment().format('LLLL');
  //   alert("rec: " + JSON.stringify(rec));
  //   this.userrecs.child(rec.recid).update(rec);
    
  // }

  // getrecordings(userid: any) {
  //   //alert("made it to firebase with parameters: " + JSON.stringify(userid));
  //   return new Promise((resolve, reject) => {
  //     this.userrecs.orderByChild("userid").once("value", function (snapshot: any) { //.equalTo(company.companyid).once("value", function (snapshot: any) {
  //       var recdata = snapshot.child("/").val();

  //       resolve(recdata);
  //     });
  //   });

  // }

  // getdownloadurl(filename) {
  //   return new Promise((resolve, reject) => {
  //     var recsfile = this.recordstorage.child(filename);
  //     //alert(recsfile.fullPath);
  //     recsfile.getDownloadURL().then(function (url) {
  //       resolve(url);
  //     }).catch(function (error) {
  //       //alert(JSON.stringify(error));
  //       reject(error);
  //     });


  //   });
  // }

  // createusersettings(settings) {
  //   //alert("made it to user settings");
  //   return new Promise((resolve, reject) => {
  //     //alert(JSON.stringify(settings));
  //     this.usersettings.push(settings).then((data: any) => {
  //       //alert("settings push success")
  //       resolve(data);
  //     }).catch(function (error: any) {
  //       //log sommething
  //       reject(error);
  //     });
  //   });
  // }


  // getusersettings(userid) {
  //   //alert(userid);
  //   var settings = new Settings();
  //   return new Promise((resolve, reject) => {
  //     this.usersettings.orderByChild("userid").equalTo(userid).once("value", function (snapshot: any) { //.equalTo(company.companyid).once("value", function (snapshot: any) {
  //       var recdata = snapshot.child("/").val();
  //       snapshot.forEach(function (childSnapshot) {
  //         var key = childSnapshot.key;
  //         var data = childSnapshot.val();
  //         // //alert(key);
  //         settings.contact1 = data.contact1;
  //         settings.contact2 = data.contact2;
  //         settings.contact3 = data.contact3;
  //         settings.contact4 = data.contact4;
  //         settings.contact5 = data.contact5;
  //         settings.timer = data.timer;
  //         settings.userid = data.userid;
  //         settings.settingsid = data.settingsid;
  //       });

  //       //alert(JSON.stringify( settings.settingsid ));
  //       resolve(settings);
  //     });
  //   });
  // }

  // getsettingsbyid(settingsid) {
  //   //alert(userid);
  //   var settings = new Settings();
  //   return new Promise((resolve, reject) => {
  //     this.usersettings.orderByChild("settingsid").equalTo(settingsid).once("value", function (snapshot: any) { //.equalTo(company.companyid).once("value", function (snapshot: any) {
  //       var recdata = snapshot.child("/").val();
  //       snapshot.forEach(function (childSnapshot) {
  //         var key = childSnapshot.key;
  //         var data = childSnapshot.val();
  //         // //alert(key);
  //         settings.contact1 = data.contact1;
  //         settings.contact2 = data.contact2;
  //         settings.contact3 = data.contact3;
  //         settings.contact4 = data.contact4;
  //         settings.contact5 = data.contact5;
  //         settings.timer = data.timer;
  //         settings.userid = data.userid;
  //         settings.settingsid = data.settingsid;
  //         settings.length = data.length;
  //       });

  //       //alert(JSON.stringify( settings ));
  //       resolve(settings);
  //     });
  //   });
  // }


  // updateusersettings(settings: Settings) {
  //   // Save user profile     
  //   alert('update user settings: ' + JSON.stringify(settings));
  //   this.usersettings.child(settings.settingsid).update(settings);
  // }


  ////////////////////////////////////////////////SIGN UP FUNCTIONS ////////////////////////////////////////////////////////
  getuser(userid: string) {
    return new Promise((resolve, reject) => {
      this.userdata.orderByChild("userid").equalTo(userid).once("value", function (snapshot: any) { //.equalTo(company.companyid).once("value", function (snapshot: any) {
        var recdata = snapshot.child("/").val();
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();

          //alert(JSON.stringify(data));
          resolve(data);

        });
      });
    });
  }

    getuserbyaccount(accountid: string) {
    return new Promise((resolve, reject) => {
      this.userdata.orderByChild("accountid").equalTo(accountid).once("value", function (snapshot: any) { //.equalTo(company.companyid).once("value", function (snapshot: any) {
        var recdata = snapshot.child("/").val();
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();

          //alert(JSON.stringify(data));
          resolve(data);

        });
      });
    });
  }

  createuser(user: User) {
    return new Promise((resolve, reject) => {
      // user.datecreated = new Date().toUTCString();
      // user.datemodified = new Date().toUTCString();
      // //alert(JSON.stringify(user));
      this.userdata.push(user).then((data: any) => {
        resolve(data);
      }).catch(function (error: any) {
        //log sommething
        reject(error);
      });
    });

  }

  updateuser(user: User) {
    // Save user profile     
    //user.datemodified = new Date().toUTCString();
    this.userdata.child(user.id).update(user);
  }

  validateuser(user: User) {
    var validated: boolean;

    return new Promise((resolve, reject) => {
      this.userdata.orderByChild("accountid").equalTo(user.id).once("value", function (snapshot: any) {
        if (snapshot) {
          var accountId = JSON.stringify(snapshot.child("/" + user.id + "/accountid").val());
          if (accountId == JSON.stringify(user.id)) {
            validated = true;
          }
          else {
            validated = false;
          }
        }
        resolve(validated);
      });
    });
  }



  createaccount(credentials: any) {
    return new Promise(function (resolve, reject) {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (user: any) {
          resolve(user);
        }).catch(function (error: any) {
          reject(error);

        });
    });
  }


  logout() {
    return new Promise(function (resolve, reject) {
      firebase.auth().signOut().then(function () {
        alert('logout success');
        resolve(true);
      }, function (error) {
        reject(error)
      });
    });
  }

  login(credentials: any) {
    return new Promise(function (resolve, reject) {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (user: any) {
           resolve(user);
        }).catch(function (error: any) {
           reject(error);

        });
    });
  }



  //   private SignUpError(error: any): void {
  //   switch (error.code) {
  //     case "auth/email-already-in-use":
  //         this.alertMessage = "The specified email is already in use!"
  //         break;
  //     case "auth/invalid-email":
  //         this.alertMessage = "The specified email is not valid!"
  //         break;
  //     case "auth/operation-not-allowed":
  //         this.alertMessage = "Your account has been disabled. Please contact support!"
  //         break;
  //     case "auth/weak-password":
  //         this.alertMessage = "Password should be at least 6 characters!"
  //         break;
  //   }    
  // }

  initializeAccountData() {
    // create user with admin role 

    // create company 
  }


}