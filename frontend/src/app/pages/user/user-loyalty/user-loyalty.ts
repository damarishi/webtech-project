import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-user-loyalty',
  imports: [Navbar],
  templateUrl: './user-loyalty.html',
  styleUrl: './user-loyalty.css',
})
export class UserLoyalty {
  title: String = "Loyalty Points";
  protected readonly UserRoles = UserRoles;
}
