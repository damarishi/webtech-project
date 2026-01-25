import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Cart} from '../../../features/cart/cart/cart';
import {OrderList} from '../../../features/cart/order-list/order-list';

@Component({
  selector: 'app-user-orders',
  imports: [Cart, OrderList],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
})
export class UserOrders {
  title: String = 'Cart';
  protected readonly UserRoles = UserRoles;
}
