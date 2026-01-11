import {Component, Input} from '@angular/core';

export type NavbarMode = 'default' | 'user';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() mode: NavbarMode = 'default';
}
