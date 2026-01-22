import { Component } from '@angular/core';
import {Navbar} from "../../shared/ui/navbar/navbar";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
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
  title!: string;
  protected readonly UserRoles = UserRoles;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const data = this.route.firstChild?.snapshot.data;
        this.title = data?.['title'] ?? '';
      });
  }
  onInit(): void {
    //Load Restaurant from DB
    //Load orders
  }
}
