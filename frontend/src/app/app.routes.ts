import { Routes } from '@angular/router';

//import Site manager Components here
import { SiteManager } from './pages/site-manager/site-manager';
import { DataView } from './pages/site-manager/data-view/data-view';
import {AuthGuard} from './auth/auth-guard';
import {LoginComponent} from './auth/login/login';
import {RestaurantOwner} from './pages/restaurant-owner/restaurant-owner'


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, //redirect to main page when created
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path: 'site-manager',
        component: SiteManager,
        canActivate: [AuthGuard]
    },
    {
        path: 'site-manager/data-view/:category',
        component: DataView,
        canActivate: [AuthGuard]
    },
    {
      path: 'restaurant-owner',
      component: RestaurantOwner,
      canActivate: [AuthGuard]
    }
];
