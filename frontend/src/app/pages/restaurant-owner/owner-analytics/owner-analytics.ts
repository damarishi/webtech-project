import {Component, OnInit} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';
import {OwnerService} from '../../../services/owner-service';
import {OwnerItem} from '../../../types/owner-item';

@Component({
  selector: 'app-owner-analytics',
  imports: [],
  templateUrl: './owner-analytics.html',
  styleUrl: './owner-analytics.css',
})
export class OwnerAnalytics implements OnInit {


  orders?: OwnerOrder[];

  totalRevenue?: number;
  dailyOrders?: OwnerOrder[];
  weeklyOrders?: OwnerOrder[];
  topItems?: OwnerItem[];

  constructor(private ownerService: OwnerService) {}

  loadOrders(){
    this.ownerService.getAllOrders()
      .then(data =>{
        this.orders = data.orders.filter(order => order.status === -1);
        console.log(this.orders);
      })
  }

  ngOnInit() {
    this.loadOrders();
  }

  setDailyOrders() {
  }

}
