import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';
import {Cart} from '../../../features/cart/cart/cart';

@Component({
  selector: 'app-user-orders',
  imports: [Navbar, Cart],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
})
export class UserOrders {
  title: String = 'Cart';
  protected readonly UserRoles = UserRoles;
}
