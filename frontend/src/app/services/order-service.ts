import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Order } from '../types/user-order';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable()

  constructor(private http: HttpClient) {}

  loadOrders() {
    this.http.get<Order[]>('http://localhost:3000/api/orders/me').subscribe(data => {
      this.ordersSubject.next(data);
    });
  }

  removerOrderLocally(orderId: number) {
    const updated = this.ordersSubject
      .value
      .filter(o => o.order_id !== orderId);

    this.ordersSubject.next(updated);
  }
}
