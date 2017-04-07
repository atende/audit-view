import { Component } from '@angular/core';
import {Http} from "@angular/http";
import { AuthService } from "angular-spa";

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {

  constructor(private auth: AuthService){

  }

  logout(){
    this.auth.logout();
  }
}
