import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HeaderModule} from './header/header.module';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import {FooterModule} from './footer/footer.module';
import {BodyModule} from './body/body.module';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationModal } from './header/modals/authenticationModal';
import { ProfileModal } from './header/modals/profileModal';
import { NewCampaignModal } from './header/modals/newCampaignModal';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { AgGridModule } from 'ag-grid-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { ProfilePage } from './body/pages/profilePage';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CampaignPage } from './body/pages/campaignPage';
import { CommunityPage } from './body/pages/communityPage';
import { CampaignGridCommandComponent } from './body/gridTemplates/campaignGridCommand-component';
import { NewCampaignMod } from './body/modals/newCampaign';
import {AppGlobals} from '../utils/globals';
import { FireBaseData } from 'src/services/firebase.service';

const config: InputFileConfig = 
{
  fileAccept: 'image/*',
    fileLimit: 1
};

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationModal,
    ProfileModal,
    NewCampaignModal,
    NewCampaignMod,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ProfilePage,
    CampaignPage,
    CommunityPage,
    CampaignGridCommandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HeaderModule,
    BodyModule,
    FooterModule,
    FormsModule,
    FileDropModule, 
    ArchwizardModule,
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),
    AgGridModule.withComponents([
      CampaignGridCommandComponent
    ])
  ],
  entryComponents: [
    AuthenticationModal, NewCampaignModal, ProfileModal, NewCampaignMod
  ],
  exports: [
    AuthenticationModal, ProfileModal, NewCampaignModal,HeaderComponent, BodyComponent, FooterComponent, NewCampaignMod
  ],
  providers: [AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
