import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './auth-service';
import {RedirectService} from '../../services/redirect-service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private redirect:RedirectService
  ) {}

  canActivate(): boolean{
    if (this.auth.isLoggedIn()) {
      console.log('Already Logged in');
      this.router.navigate([this.redirect.getUserRoute('')]);
      return false;
    }
    return true;
  }
}
