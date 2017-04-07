import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { appRoutingProviders, routing } from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeModule } from "./+home/home.module";
import { SearchModule } from "./+search/search.module";
import { SharedModule } from "./shared/shared.module";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    routing,
    HomeModule,
    SearchModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
