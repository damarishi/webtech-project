import {ChangeDetectorRef, Component} from '@angular/core';
import { AuthService } from '../auth-service';
import { objToEnum } from '../../interfaces/user-roles';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { RedirectService } from '../../services/redirect-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService,private redirect:RedirectService, private router: Router, private cdr: ChangeDetectorRef) {}



  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        let roles = res.roles.map(role => objToEnum(role));
        this.auth.setSessionData(res.token,res.username, roles);
        this.router.navigate([this.redirect.getUserRoute('home')]);
        this.cdr.detectChanges();  // force Angular to update view
      },
      error: (err) => {
        console.log(err.error.message);
        this.error = 'Login failed';
        console.log(this.error);
        this.cdr.detectChanges();  // force Angular to update view
      }
    });
  }
}
