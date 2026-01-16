import { CommonModule } from '@angular/common';   //für @for benötigt
import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../types/restaurant';
import {RestaurantService} from '../../../services/restaurant-service';
import {RestaurantComponent} from '../restaurant-component/restaurant-component';
import {ChangeDetectorRef} from '@angular/core';
import {RestaurantFilter} from '../../../types/RestaurantFilter';

@Component({
  selector: 'app-restaurant-component-list',
  standalone: true,
  imports: [RestaurantComponent, CommonModule],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchData();
    console.log('RestaurantList init');
  }

  fetchData() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
      this.changeDetector.detectChanges();    //damit for-Schleife beim ersten laden angezeigt wird, ansonsten wird kein 'change' erkannt
      console.log(this.restaurants);
    })
  }

  @Input() filter!: RestaurantFilter;
  @Input() searchText = '';

  get filteredRestaurants() {
    return this.restaurants.filter(r =>
      (!this.filter.cuisines.length || this.filter.cuisines.includes(r.cuisine)) &&       //wenn kein filter aktiv !0 -> true
      (!this.filter.categories.length || this.filter.categories.includes(r.category)) &&
      (!this.filter.prices.length || this.filter.prices.includes(r.priceLevel)) &&
      (!this.searchText || r.restaurant_name.toLowerCase().includes(this.searchText))
    );
  }
}
