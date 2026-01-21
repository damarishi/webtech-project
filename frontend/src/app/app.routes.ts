import { Routes } from '@angular/router';

//import Site manager Components here
import { SiteManager } from './pages/site-manager/site-manager';
import { DataView } from './pages/site-manager/data-view/data-view';
import {AuthGuard} from './features/auth/auth-guard';
import {LoginGuard} from './features/auth/login-guard';
import {LoginComponent} from './features/auth/login/login';
import {RegisterComponent} from './features/auth/register/register';
import {RestaurantOwner} from './pages/restaurant-owner/restaurant-owner';

import {USER_ROUTES} from './pages/user/user.routes';
import {User} from './pages/user/user';
import {UserRoles} from './types/user-roles';
import {OWNER_ROUTES} from './pages/restaurant-owner/owner.routes';


export const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full'  }, //redirect to main page when created

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
      data: { role: UserRoles.ADMIN },
  },

  {
      path: 'site-manager/data-view/:category',
      component: DataView,
      canActivate: [AuthGuard],
      data: { role: UserRoles.ADMIN },
  },

  {
    path: 'restaurant-owner',
    component: RestaurantOwner,
    children: OWNER_ROUTES,
    canActivate: [AuthGuard],
    data: { role: UserRoles.OWNER },
  },
  {
    path: 'user',
    component: User,
    children: USER_ROUTES,
    canActivate: [AuthGuard],
    data: { role: UserRoles.USER },
  }
];
