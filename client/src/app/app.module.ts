import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {routing, appRoutingProviders} from './app.routes';

import { AppComponent } from './app.component';
import { HomeModule } from './+home/home.module';
import { SearchModule } from './+search/search.module';
import {SharedModule} from "./shared/shared.module";
import { AuthModule, InitOptions } from "angular-spa";

import {environment} from '../environments/environment';


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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
