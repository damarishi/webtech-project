import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import {UserRoles} from '../../../types/user-roles';
import { Observable } from 'rxjs';
import {Navbar} from '../../../shared/ui/navbar/navbar';
import {UserService} from '../../../services/user-service';
import {User} from '../../../types/user'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  title: String = 'Your Profile';
  protected readonly UserRoles = UserRoles;

  user$!: Observable<User>;

  //separates Form-Model
  form: Partial<User> = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.getMe();

    //User -> Form einmal kopieren
    this.user$.subscribe(user => {
      console.log(user.location.x);
      this.form = {
        username: user.username,
        full_name: user.full_name,
        location: {
          x: user.location?.x ?? 0,
          y: user.location?.y ?? 0,
        },
      };
    });
  }

  save() {
    this.userService.updateMe(this.form).subscribe({
      next: updated => {
        console.log('User updated', updated);
      },
      error: error => console.error(error),
    })
  }

}
