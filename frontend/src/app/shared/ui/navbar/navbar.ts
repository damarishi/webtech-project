import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AuthService} from '../../../features/auth/auth-service';
import {UserRoles} from '../../../types/user-roles';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
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

  @Output() searchChange = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchChange.emit(value);
  }

  protected readonly UserRoles = UserRoles;
}
