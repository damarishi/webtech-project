import { Routes } from '@angular/router';

//import Site manager Components here
import { SiteManager } from './pages/site-manager/site-manager';
import { DataView } from './pages/site-manager/data-view/data-view';
import {AuthGuard} from './auth/auth-guard';
import {LoginGuard} from './auth/login-guard';
import {LoginComponent} from './auth/login/login';
import {RegisterComponent} from './auth/register/register';
import {RestaurantOwner} from './pages/restaurant-owner/restaurant-owner';
import { User } from './pages/user/user'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, //redirect to main page when created

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
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
  },
  {
    path: 'user',
    component: User,
    //canActivate: [AuthGuard]
  }
];
