import { Component } from '@angular/core';
import { AuthService } from '../../../features/auth/auth-service';

@Component({
  selector: 'app-owner-profile',
  imports: [],
  templateUrl: './owner-profile.html',
  styleUrl: './owner-profile.css',
})
export class OwnerProfile {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
