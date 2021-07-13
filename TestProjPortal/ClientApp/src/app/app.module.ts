import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ScopeSelectorComponent } from './scope-selector/scope-selector.component';
import { MenuComponent } from './menu/menu.component';
import { BreadsCrumbsComponent } from './modules/wizard/breads-crumbs/breads-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WizardStorageService } from './modules/wizard/shared';
import { BaseResolver } from './shared/base-resolver';
import { FormService } from './shared';
import { BreadsCrumbsService } from './shared/breads-crumbs.service';
import { InquiryViewResolver } from './shared/inquiry-view-resolver';
import { Es3Interceptor } from './shared/Es3Interceptor';
import { Es3HttpClient } from './shared/es3-http-client';

export const esConstant = new InjectionToken<any>("esConstant");
export const SERVER_URL = new InjectionToken<string>("SERVER_URL");

const constants = {
  fileNotChoosen: "Файл не выбран",
  noRestrictions: 101,
  inquiryInfoTitle: "Параметры заявления"
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ScopeSelectorComponent,
    MenuComponent,
    BreadsCrumbsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    WizardStorageService,
    BaseResolver,
    FormService,
    BreadsCrumbsService,
    InquiryViewResolver,
    {
      provide: esConstant,
      useValue: constants
    },
    { provide: SERVER_URL, useValue: "http://localhost:3500" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Es3Interceptor,
      multi: true,
    },
    {
      provide: HttpClient,
      useClass: Es3HttpClient
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
