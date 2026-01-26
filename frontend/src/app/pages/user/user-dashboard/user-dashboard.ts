import {Component, OnInit} from '@angular/core';
import {FilterSidebar} from '../../../features/restaurant/filter-sidebar/filter-sidebar';
import {RestaurantList} from '../../../features/restaurant/restaurant-list/restaurant-list';
import {UserRoles} from '../../../types/user-roles';
import {RestaurantStateService} from '../../../services/restaurant-state-service';
import {RestaurantFilter} from '../../../types/RestaurantFilter';
import {Restaurant} from '../../../types/restaurant';
import {RestaurantService} from '../../../services/restaurant-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [FilterSidebar, RestaurantList, AsyncPipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  protected readonly UserRoles = UserRoles;

  activeFilter: RestaurantFilter = {
    cuisines: [],
    categories: [],
    prices: [],
    maxMinutes: 999
  };

  restaurants$!: Observable<Restaurant[]>;
  searchText = '';

  constructor(
    private state: RestaurantStateService,
    private restaurantService: RestaurantService
  ) {
    this.state.search$.subscribe(text => {
      this.searchText = text.toLowerCase();
    });
  }

  ngOnInit() {
    // initial alle Restaurants laden
    this.loadRestaurants(this.activeFilter.maxMinutes);
  }

  loadRestaurants(maxMinutes: number) {
    console.log('Loading restaurants with maxMinutes:', maxMinutes);
    this.restaurants$ = this.restaurantService.getDashboardRestaurants(maxMinutes);
  }

  onFilterChange(filter: RestaurantFilter) {
    console.log('Filter changed:', filter);
    this.activeFilter = { ...filter };
    this.loadRestaurants(filter.maxMinutes ?? 999);
  }
}
