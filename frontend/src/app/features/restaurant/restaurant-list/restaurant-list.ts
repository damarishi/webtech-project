import { CommonModule } from '@angular/common';   //für @for benötigt
import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../types/restaurant';
import {RestaurantService} from '../../../services/restaurant-service';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {ChangeDetectorRef} from '@angular/core';
import {RestaurantFilter} from '../../../types/RestaurantFilter';
import {RestaurantCard} from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-component-list',
  standalone: true,
  imports: [RestaurantComponent, CommonModule, RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList {
  @Input() restaurants: Restaurant[] = [];
  @Input() filter!: RestaurantFilter;
  @Input() searchText = '';

  get filteredRestaurants() {
    console.log('RestaurantList:' + this.restaurants);
    const max = this.filter?.maxMinutes ?? 999;
    const result = this.restaurants.filter(r => {
      return (
        (!this.filter.cuisines.length || this.filter.cuisines.includes(r.cuisine)) &&
        (!this.filter.categories.length || this.filter.categories.includes(r.category)) &&
        (!this.filter.prices.length || this.filter.prices.includes(r.priceLevel)) &&
        r.estimatedDeliveryTime <= max &&
        (!this.searchText || r.restaurant_name.toLowerCase().includes(this.searchText))
      );
    });
    console.log('Filtered restaurants:', JSON.stringify(result, null, 2)); // Debug hier
    return result;
  }
}
