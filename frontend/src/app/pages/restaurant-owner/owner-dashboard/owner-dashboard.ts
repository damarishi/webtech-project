import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OwnerService} from '../../../services/owner-service';
import {JsonPipe} from '@angular/common';
import {OrderCardComponent} from '../order-card-component/order-card-component';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    OrderCardComponent,
    JsonPipe

  ],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css',
})
export class OwnerDashboard implements OnInit {
  orders: OwnerOrder[] = [];
  restaurant:OwnerRestaurant | undefined;
  message:string = '';

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    //this.getRestaurant();
    this.getOrders();
  }

  getOrders() {
    this.ownerService.getAllOrders().then(data => {
      this.orders = data.orders;
      console.log(this.orders);
      this.cdr.detectChanges();
      })
  }

  putRestaurant(){
    this.ownerService.putRestaurant(this.restaurant!).then(
      res => {
        console.log("Restaurant Updated")
      }
    ).catch(error => console.log(error));
  }

  onOrderUpdate(){
    this.getOrders();
  }
}
