import {ChangeDetectorRef, Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth-service';
import { UserRoles } from '../../../types/user-roles';
import {Position} from '../../../types/position';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  UserRoles = UserRoles;

  //Position constraints
  min = 0;
  max = 100;

  email = '';
  password = '';
  repeatPassword = '';
  username = '';
  fullName = '';
  location_x = '';
  location_y = '';
  roles: UserRoles[] = [];

  bannerMessage = '';
  bannerType: 'success' | 'error' = 'success';

  constructor(private auth: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}

  showBanner() {
    setTimeout(() => {
      this.bannerMessage = '';
      this.cdr.detectChanges();
    }, 3000);
  }

  toggleRole(event: any) {
    const value = event.target.value as UserRoles;
    if (event.target.checked) {
      this.roles.push(value);
    } else {
      this.roles = this.roles.filter(r => r !== value);
    }
  }

  onRegister() {
    if(this.roles.length === 0) {
      this.bannerMessage = 'Select at least one Role';
      this.bannerType = 'error';
      this.showBanner();
      this.cdr.detectChanges();
      return;
    }
    this.auth.register(
      this.email,
      this.password,
      this.username,
      this.fullName,
      new Position(this.location_x, this.location_y).getPair(),
      this.roles
    ).subscribe({
      next: () => {
        this.bannerMessage = 'Registration successful';
        this.bannerType = 'success';
        this.showBanner();
        this.router.navigate(['/login'],{state: {message: "Registration Successful"}});
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err.error);
        this.bannerMessage = err.error?.message || 'Registration failed';
        this.bannerType = 'error';
        this.showBanner();
        this.cdr.detectChanges();
      }
    });
  }

  protected readonly Number = Number;
}
