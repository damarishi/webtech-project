import { Component } from '@angular/core';
import { AuthService } from '../../../features/auth/auth-service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {UserRoles} from '../../../types/user-roles';
import {Router} from '@angular/router';
import {RedirectService} from '../../../services/redirect-service';

@Component({
  selector: 'app-owner-profile',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './owner-profile.html',
  styleUrl: './owner-profile.css',
})
export class OwnerProfile {
  constructor(private auth: AuthService, private router: Router, private redirect: RedirectService) {}

  logout() {
    this.auth.logout();
  }

  protected readonly UserRoles = UserRoles;
  protected readonly Object = Object;
  newRole: UserRoles | null = null;

  onRoleChange() {
    const currentRole = this.auth.getCurrentUserRole();
    console.log(currentRole);
    console.log(this.newRole);
    if(currentRole && currentRole !== this.newRole) {
      console.log("Changing Roles...");
      //Will automatically match homepage for each user, auth guard still blocks unauthorized access
      this.router.navigate([this.redirect.getUserRoute('')]);
    }
    console.log("Not changing roles");
  }
}
