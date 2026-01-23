import { Routes } from '@angular/router';

//import Site manager Components here
import { SiteManager } from './pages/site-manager/site-manager';
import { RestaurantDataView } from './pages/site-manager/data-view/restaurant-data-view/restaurant-data-view';
import { RequestDataView } from './pages/site-manager/data-view/request-data-view/request-data-view';
import { UserDataView } from './pages/site-manager/data-view/user-data-view/user-data-view';


import {AuthGuard} from './features/auth/auth-guard';
import {LoginGuard} from './features/auth/login-guard';
import {LoginComponent} from './features/auth/login/login';
import {RegisterComponent} from './features/auth/register/register';
import {RestaurantOwner} from './pages/restaurant-owner/restaurant-owner';

import {USER_ROUTES} from './pages/user/user.routes';
import {User} from './pages/user/user';
import {UserRoles} from './types/user-roles';


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
      canActivate: [AuthGuard],
    data: { roles: [UserRoles.ADMIN] },
  },
/*
  {   //soon deprecated
      path: 'site-manager/data-view/:category',
      component: DataView,
      canActivate: [AuthGuard],
      data: { roles: [UserRoles.ADMIN] },
  },*/

  {
      path: 'site-manager/data-view/restaurants',
      component: RestaurantDataView,
      canActivate: [AuthGuard],
      data: { roles: [UserRoles.ADMIN] },
  },

  {
      path: 'site-manager/data-view/restaurant_requests',
      component: RequestDataView,
      canActivate: [AuthGuard],
      data: { roles: [UserRoles.ADMIN] },
  },

  {
      path: 'site-manager/data-view/users',
      component: UserDataView,
      canActivate: [AuthGuard],
      data: { roles: [UserRoles.ADMIN] },
  },  

  {
    path: 'restaurant-owner',
    component: RestaurantOwner,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.OWNER] },
  },
  {
    path: 'user',
    component: User,
    children: USER_ROUTES,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.USER] },
  }
];
