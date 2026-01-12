import { Component } from '@angular/core';
import {FilterSidebar} from '../../../features/restaurant/filter-sidebar/filter-sidebar';
import {RestaurantList} from '../../../features/restaurant/restaurant-list/restaurant-list';
import {UserRoles} from '../../../interfaces/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-user-dashboard',
  imports: [FilterSidebar, RestaurantList, Navbar],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  protected readonly UserRoles = UserRoles;
}
