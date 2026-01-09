import { Routes } from '@angular/router';

//import user components
import { User } from './pages/user/user';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, //redirect to main page when created
  {
    path: 'user',
    component: User,
    //canActivate: [AuthGuard]
  },
];
