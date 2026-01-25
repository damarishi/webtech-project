import { CommonModule } from '@angular/common';   //für @for benötigt
import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
      (!this.filter.categories.length || this.filter.categories.includes(r.category)) &&
      (!this.filter.prices.length || this.filter.prices.includes(r.priceLevel)) &&
      r.estimatedDeliveryTime <= max &&
      (!this.searchText || r.restaurant_name.toLowerCase().includes(this.searchText))
    );
  }
}
