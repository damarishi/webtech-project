// auth.guard.ts
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from './auth-service';
import {UserRoles} from '../../types/user-roles';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);//Token authenticity checked in backend before any data access
      return false;
    }
    const allowed = route.data['roles'] as UserRoles[];
    let userRole;
    if(this.auth.initializeRoles() && (userRole = this.auth.getCurrentUserRole())){
      if(allowed && !allowed.includes(userRole)){
        return false;//ROLE not in list
      }
    }else{
      this.auth.logout();
      this.router.navigate(['/login']);
      return false;//ERROR initializing roles
    }
    return true;//NO AUTH or AUTH OK for this route
  }
}
