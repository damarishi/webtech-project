import { Injectable } from '@angular/core';
import {getRoleRoutes} from '../interfaces/user-roles';
import {AuthService} from '../auth/auth-service';

@Injectable({providedIn: 'root'})
export class RedirectService {

  constructor( private auth: AuthService) {}

  getUserRoute(destination:string){
    let role = this.auth.getCurrentUserRole() ?? this.auth.getTopRole();

    if(!role) return '/unauthorized';

    this.auth.setCurrentUserRole(role);
    return `/${getRoleRoutes(role)}/${destination}`;
  }
}
