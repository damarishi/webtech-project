import {Component, Input} from '@angular/core';
import { AuthService} from '../../../auth/auth-service';
import {UserRoles} from '../../../interfaces/user-roles';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  @Input() role!: UserRoles;

  @Input() showSearch!: boolean;

  @Input() title!: String;

  logout() {
    this.authService.logout();
  }

  protected readonly UserRoles = UserRoles;
}
