import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';
import {OwnerService} from '../../../services/owner-service';
import {OrderCardComponent} from '../order-card-component/order-card-component';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    OrderCardComponent,
  ],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css',
})
export class OwnerDashboard implements OnInit {
  orders: OwnerOrder[] = [];
  message:string = '';

  restaurantUnavailable: boolean = false;

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.getRestaurant().then(restaurant => {
      if(!restaurant.restaurant_id){//DB Object is guaranteed to have id
        this.restaurantUnavailable = true;
        this.cdr.detectChanges();
        return;
      }
      this.getOrders();
    })
  }

  getOrders() {
    this.ownerService.getAllOrders().then(data => {
      this.orders = data.orders.filter(order => order.status >= 0);
      console.log(this.orders);
      this.cdr.detectChanges();
      })
  }

  onOrderUpdate(){
    this.getOrders();
  }

  getRestaurant(){
    return this.ownerService.getRestaurant();
  }
}
