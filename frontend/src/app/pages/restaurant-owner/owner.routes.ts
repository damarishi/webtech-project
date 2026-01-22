import { Routes } from '@angular/router';
import {OwnerDashboard} from './owner-dashboard/owner-dashboard';
import {OwnerProfile} from './owner-profile/owner-profile';
import {OwnerAnalytics} from './owner-analytics/owner-analytics';
import {OwnerRestaurantSettings} from './owner-restaurant-settings/owner-restaurant-settings';

export const OWNER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: OwnerDashboard,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'restaurant-settings',
    component: OwnerRestaurantSettings,
    data: {
      title: 'Restaurant Settings'
    }
  },
  {
    path: 'analytics',
    component: OwnerAnalytics,
    data: {
      title: 'Analytics'
    }
  },
  {
    path: 'profile',
    component: OwnerProfile,
    data: {
      title: 'Profile'
    }
  }
  ];
