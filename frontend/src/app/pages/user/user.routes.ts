import { Routes } from '@angular/router';
import {UserDashboard} from './user-dashboard/user-dashboard';
import {UserLoyalty} from './user-loyalty/user-loyalty';
import {UserOrders} from './user-orders/user-orders';
import {UserProfile} from './user-profile/user-profile';
import {User} from './user';

export const USER_ROUTES: Routes = [
  {path: '', component: UserDashboard,
  data: {
    title: 'Dashboard',
    showSearch: false,
  }},

  {path: 'loyalty', component: UserLoyalty,
  data: {
    title: 'Loyalty Points',
    showSearch: false
  }},

  {path: 'orders', component: UserOrders,
  data: {
  title: 'Cart',
  showSearch: false
  }},

  {path: 'profile', component: UserProfile,
  data: {
  title: 'My Profile',
  showSearch: false
  }}
]
