import { Component } from '@angular/core';
import {Navbar} from '../../shared/ui/navbar/navbar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    Navbar
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

}
