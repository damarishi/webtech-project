import { Routes } from '@angular/router';
import {UserDashboard} from './user-dashboard/user-dashboard';
import {UserLoyalty} from './user-loyalty/user-loyalty';
import {UserOrders} from './user-orders/user-orders';
import {UserProfile} from './user-profile/user-profile';
import {User} from './user';
import {RestaurantDetail} from '../../features/restaurant/restaurant-detail/restaurant-detail';
import {AuthGuard} from '../../features/auth/auth-guard';


export const USER_ROUTES: Routes = [
    {
      path: '',
      component: UserDashboard,
      canActivate: [AuthGuard],
      data: {
      title: 'Dashboard',
      showSearch: true,
      }
    },

    {
      path: 'restaurant/:id',
      component: RestaurantDetail,
      canActivate: [AuthGuard],
      data: {
        title: '',
        showSearch: false
      }
    },

    {
      path: 'loyalty',
      component: UserLoyalty,
      canActivate: [AuthGuard],
      data: {
        title: 'Loyalty Points',
        showSearch: false
      }
    },
    {
      path: 'orders',
      component: UserOrders,
      canActivate: [AuthGuard],
      data: {
        title: 'Cart',
        showSearch: false
      }
    },
    {
      path: 'profile',
      component: UserProfile,
      canActivate: [AuthGuard],
      data: {
        title: 'My Profile',
        showSearch: false
      }
    }
  ];
