// auth.guard.ts
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from './auth-service';
import {UserRoles} from '../../types/user-roles';
import {RedirectService} from '../../services/redirect-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private redirect:RedirectService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);//Token authenticity checked in backend before any data access
      return false;
    }
    const destinationRole = route.data['role'] as UserRoles;
    if(this.auth.initializeRoles() && (this.auth.getCurrentUserRole())){//Check roles where initialized correctly
      let roleList = this.auth.getRoles()
      if(destinationRole && !roleList.includes(destinationRole)){//No auth needed if destinationRole is empty
        console.log('Access denied:(/'+route.url+')');
        this.router.navigate([this.redirect.getUserRoute('')]);
        return false;
      }
    }else{//Logout on initialization Error
      this.auth.logout();
      this.router.navigate(['/login']);
      console.error('Access denied: Role Error');
      return false;//ERROR initializing roles
    }
    console.log("Proceed");
    return true;//NO AUTH or AUTH OK for this route
  }
}
