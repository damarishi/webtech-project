import { Injectable } from '@angular/core';
import {getRoleRoutes} from '../types/user-roles';
import {AuthService} from '../features/auth/auth-service';

@Injectable({providedIn: 'root'})
export class RedirectService {

  constructor( private auth: AuthService) {}

  getUserRoute(destination:string){
    let role;
    if(this.auth.initializeRoles() && (role = this.auth.getCurrentUserRole())){
      return `/${getRoleRoutes(role)}/${destination}`;
    }
    return '/unauthorized';
  }
}
