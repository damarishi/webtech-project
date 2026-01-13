import { Component } from '@angular/core';
import {FilterSidebar} from '../../../features/restaurant/filter-sidebar/filter-sidebar';
import {RestaurantList} from '../../../features/restaurant/restaurant-list/restaurant-list';
import {UserRoles} from '../../../interfaces/user-roles';

@Component({
  selector: 'app-user-dashboard',
  imports: [FilterSidebar, RestaurantList],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  protected readonly UserRoles = UserRoles;
}
