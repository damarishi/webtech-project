import { Component } from '@angular/core';
import {FilterSidebar} from '../../../features/restaurant/filter-sidebar/filter-sidebar';
import {RestaurantList} from '../../../features/restaurant/restaurant-list/restaurant-list';
import {UserRoles} from '../../../types/user-roles';
import {RestaurantStateService} from '../../../services/restaurant-state-service';

@Component({
  selector: 'app-user-dashboard',
  imports: [FilterSidebar, RestaurantList],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  protected readonly UserRoles = UserRoles;

  activeFilter = {
    cuisines: [],
    categories: [],
    prices: []
  };

  onFilterChange(filter: any){
    this.activeFilter = {...filter};    //object spread -> erzeugt neue referenz
  }

  searchText = '';

  constructor(private state: RestaurantStateService) {
    this.state.search$.subscribe(text => {
      this.searchText = text.toLowerCase();
    });
  }
}
