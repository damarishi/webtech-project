import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-user-orders',
  imports: [Navbar],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
})
export class UserOrders {
  title: String = 'Cart';
  protected readonly UserRoles = UserRoles;
}
