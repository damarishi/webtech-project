// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {UserRoles} from '../../types/user-roles';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; //base backend URL

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string, username:string,roles:string[]}>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password:string, username:string, fullName:string,location:string, roles:UserRoles[]){
    return this.http.post<void>(`${this.apiUrl}/register`, { email, password, username, fullName, location, roles});
  }

  initializeRoles(){
    let currentRole = this.getCurrentUserRole();
    if(!currentRole){
      currentRole = this.getTopRole();
      if(!currentRole) return false;
      this.setCurrentUserRole(currentRole);
    }
    return true;
  }

  getRoles() {
    const value = sessionStorage.getItem('roles');
    if(!value) return [];
    return JSON.parse(value) as UserRoles[];
  }
  getTopRole(){
    const roles = this.getRoles();
    if (roles.includes(UserRoles.ADMIN)) return UserRoles.ADMIN;
    if (roles.includes(UserRoles.OWNER)) return UserRoles.OWNER;
    if (roles.includes(UserRoles.USER)) return UserRoles.USER;
    return undefined;
  }

  setCurrentUserRole(role:UserRoles){
    sessionStorage.setItem('currentRole',JSON.stringify(role));
  }

  getCurrentUserRole():UserRoles | undefined {
    const value = sessionStorage.getItem('currentRole');
    if(!value) return undefined;
    return JSON.parse(value) as UserRoles;
  }

  setSessionData(token: string, username:string, roles:(UserRoles | undefined)[]) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getUsername(){
    return sessionStorage.getItem('username');
  }



  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('currentRole');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
