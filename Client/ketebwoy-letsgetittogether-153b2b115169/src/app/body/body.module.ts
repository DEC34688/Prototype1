import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationPage } from './pages/authenticationPage';
import { ProfilePage } from './pages/profilePage';


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
   
  ],
  providers: [],
  bootstrap: [BodyComponent]
})
export class BodyModule { }
