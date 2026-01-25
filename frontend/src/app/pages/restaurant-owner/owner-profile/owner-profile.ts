import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../features/auth/auth-service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {UserRoles} from '../../../types/user-roles';
import {Router} from '@angular/router';
import {RedirectService} from '../../../services/redirect-service';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../../types/user';
import {OwnerService} from '../../../services/owner-service'

@Component({
  selector: 'app-owner-profile',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './owner-profile.html',
  styleUrl: './owner-profile.css',
})
export class OwnerProfile implements OnInit{
  constructor(private auth: AuthService, private router: Router, private redirect: RedirectService, private ownerService: OwnerService) {}

  user$!: Promise<User>;

  form: User | undefined;

  ngOnInit() {
    this.user$ = this.ownerService.getUser();
    this.user$.then(user => {
      this.form = JSON.parse(JSON.stringify(user));
    });
  }

  save() {
    console.log(this.form);
    this.ownerService.putUser(this.form!);
  }

  protected readonly UserRoles = UserRoles;
  protected readonly Object = Object;
  newRole: UserRoles | null = null;

  onRoleChange() {
    const currentRole = this.auth.getCurrentUserRole();
    console.log(currentRole);
    console.log(this.newRole);
    if(currentRole && currentRole !== this.newRole) {
      console.log("Changing Roles...");
      //Will automatically match homepage for each user, auth guard still blocks unauthorized access
      this.router.navigate([this.redirect.getUserRoute('')]);
    }
    console.log("Not changing roles");
  }
}
