import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-user-profile',
  imports: [Navbar],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  title: String = 'Your Profile';
  protected readonly UserRoles = UserRoles;
}
