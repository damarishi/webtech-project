import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {Navbar} from '../../shared/ui/navbar/navbar';
import {UserRoles} from '../../interfaces/user-roles';
import {filter} from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    Navbar,
    RouterModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  showSearch!: boolean;
  title!: string;
  protected readonly UserRoles = UserRoles;

  constructor(
    private router: Router,
    private route: ActivatedRoute   //aktuelle route
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))    //bei navigationsende, wenn seite aktiv
      .subscribe(() => {
        const data = this.route.firstChild?.snapshot.data;
        this.title = data?.['title'] ?? '';
        this.showSearch = data?.['showSearch'] ?? false;
      });
  }
}
