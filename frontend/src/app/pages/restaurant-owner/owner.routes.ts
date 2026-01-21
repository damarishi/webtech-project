import { Routes } from '@angular/router';
import {OwnerDashboard} from './owner-dashboard/owner-dashboard';
import {OwnerProfile} from './owner-profile/owner-profile';
import {OwnerAnalytics} from './owner-analytics/owner-analytics';

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
