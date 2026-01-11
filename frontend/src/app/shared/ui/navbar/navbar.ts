import {Component} from '@angular/core';
import { AuthService} from '../../../auth/auth-service';
import {UserRoles} from '../../../interfaces/user-roles';
import {User} from '../../../pages/user/user';

export type NavbarMode = 'default' | 'user' ;

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get role(): UserRoles | undefined {
    console.log(this.authService.getCurrentUserRole());
    return this.authService.getCurrentUserRole();
  }

  logout() {
    this.authService.logout();
  }
}
