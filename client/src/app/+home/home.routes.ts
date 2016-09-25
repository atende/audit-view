import { Routes } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent}  
];
