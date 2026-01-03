import {ChangeDetectorRef, Component} from '@angular/core';
import { AuthService } from '../auth-service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

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

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}



  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        //this.router.navigate(['/dashboard']);
        this.error = "Login success"; //temp
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
