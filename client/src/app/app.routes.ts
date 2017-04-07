import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SearchComponent } from './+search/index';
import { HomeComponent } from './+home/index';
import {LoginGuard} from 'angular-spa'

const appRoutes: Routes = [
    { path: 'search', component: SearchComponent, canActivate: [LoginGuard] },
    { path: '', component: HomeComponent, canActivate: [LoginGuard] }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
