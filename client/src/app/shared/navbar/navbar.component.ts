import { Component } from '@angular/core';
import {Http} from "@angular/http";

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {

  constructor(private http: Http){

  }

  logout(){
    this.http.post("/sso/logout", null).toPromise();
  }
}
