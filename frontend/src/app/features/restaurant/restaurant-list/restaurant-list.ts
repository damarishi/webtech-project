import { CommonModule } from '@angular/common';   //für @for benötigt
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Restaurant} from '../../../types/restaurant';
import {RestaurantFilter} from '../../../types/restaurant-filter';
import {RestaurantCard} from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-component-list',
  standalone: true,
  imports: [CommonModule, RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList implements OnChanges {
  @Input() restaurants: Restaurant[] | null = [];
  @Input() filter!: RestaurantFilter;
  @Input() searchText = '';

  filtered: Restaurant[] = [];

  ngOnChanges() {
    if (!this.restaurants) {
      this.filtered = [];
      return;
    }

    const max = this.filter?.maxMinutes ?? 999;

    this.filtered = this.restaurants.filter(r =>
      (!this.filter.cuisines.length || this.filter.cuisines.includes(r.cuisine)) &&
      (!this.filter.prices.length || this.filter.prices.includes(r.price_level)) &&
      r.estimatedDeliveryTime <= max &&
      (!this.searchText || r.restaurant_name.toLowerCase().includes(this.searchText))
    );
  }
}
