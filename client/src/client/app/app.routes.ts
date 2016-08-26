import { Routes } from '@angular/router';

import { SearchRoutes } from './+search/index';
import { HomeRoutes } from './+home/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...SearchRoutes
];
