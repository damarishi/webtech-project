import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OwnerOrder} from '../../../types/owner-order';
import {OwnerRestaurant} from '../../../types/owner-restaurant';
import {OwnerService} from '../../../services/owner-service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css',
})
export class OwnerDashboard implements OnInit {
  orders: OwnerOrder[] | undefined;
  restaurant:OwnerRestaurant | undefined;

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant(){
    this.ownerService.getRestaurant().then(
      res => {
        this.restaurant = res;
        console.log(this.restaurant);
        this.cdr.detectChanges()
      }).catch(error => console.log(error));
  }

  putRestaurant(){
    this.ownerService.putRestaurant(this.restaurant!).then(
      res => {
        console.log("Restaurant Updated")
      }
    ).catch(error => console.log(error));
  }
}
