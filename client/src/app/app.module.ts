import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {appRoutingProviders, routing} from './app.routes';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AuthModule, InitOptions} from 'angular-spa';
import {HomeModule} from './+home/home.module';
import {SearchModule} from './+search/search.module';
import {GrowlModule} from 'primeng/primeng';

import {environment} from '../environments/environment';
import {Interceptor} from 'angular-http-interceptor';
import {HttpStatusErrorInterceptor, LoadingBarInterceptor} from './shared/interceptors/interceptors';
import {AppService} from './app.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    SharedModule,
    SlimLoadingBarModule.forRoot(),
    HttpModule,
    routing,
    HomeModule,
    GrowlModule,
    SearchModule
  ],
  providers: [
    appRoutingProviders,
    AppService,
    {
      provide: Interceptor,
      useClass: HttpStatusErrorInterceptor,
      multi: true
    },  {
      provide: Interceptor,
      useClass: LoadingBarInterceptor,
      multi: true
    },
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
