import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Order} from '../../../types/user-order';
import {USER_ORDER_STATE} from '../../../types/user-order-state';
import {OrderService} from '../../../services/order-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  orders$: Observable<Order[]>;
  statusMap = USER_ORDER_STATE;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getMyOrders();
  }
}
