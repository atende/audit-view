import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {routing, appRoutingProviders} from './app.routes';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { AuthModule, InitOptions } from 'angular-spa';
import { HomeModule } from "./+home/home.module";
import { SearchModule } from "./+search/search.module";

import { environment } from '../environments/environment';
import {AppService} from "./app.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    SharedModule,
    HttpModule,
    routing,
    HomeModule,
    SearchModule
  ],
  providers: [
    appRoutingProviders,
    {
      provide: InitOptions,
      useValue: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      }
    }, AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
