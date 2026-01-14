import { Injectable } from '@angular/core';
import {getRoleRoutes} from '../types/user-roles';
import {AuthService} from '../features/auth/auth-service';

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
