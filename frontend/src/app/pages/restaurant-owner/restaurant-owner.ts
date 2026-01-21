import { Component } from '@angular/core';
import {Navbar} from "../../shared/ui/navbar/navbar";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {RestaurantStateService} from '../../services/restaurant-state-service';
import {UserRoles} from '../../types/user-roles';
import {filter} from 'rxjs';

@Component({
  selector: 'app-owner',
  standalone: true,
    imports: [
        Navbar,
        RouterOutlet
    ],
  templateUrl: './restaurant-owner.html',
  styleUrl: './restaurant-owner.css',
})
export class RestaurantOwner {
  showSearch!: boolean;
  title!: string;
  protected readonly UserRoles = UserRoles;

  constructor(
    private state: RestaurantStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))    //bei navigationsende, wenn seite aktiv
      .subscribe(() => {
        const data = this.route.firstChild?.snapshot.data;
        this.title = data?.['title'] ?? '';
        this.showSearch = data?.['showSearch'] ?? false;
      });
  }

  searchText = '';

  onSearchChange(text: string) {
    this.state.setSearch(text);
  }
}
