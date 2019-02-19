import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationModal } from './modals/authenticationModal';


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
  bootstrap: [HeaderComponent]
})
export class HeaderModule { }
