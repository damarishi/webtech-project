import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AuthService } from '../auth-service';
import { strToEnum } from '../../interfaces/user-roles';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { RedirectService } from '../../services/redirect-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  bannerMessage = '';
  bannerType: 'success' | 'error' = 'success';

  constructor(private auth: AuthService,private redirect:RedirectService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const nav = history.state;
    if (nav.message) {
      this.bannerMessage = nav.message;
      this.bannerType = 'success';
      this.showBanner();
    }
  }

  showBanner() {
    setTimeout(() => {
      this.bannerMessage = '';
      this.cdr.detectChanges();
    }, 3000);
  }


  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        let roles = res.roles.map(role => strToEnum(role));
        this.auth.setSessionData(res.token,res.username, roles);
        this.bannerMessage = 'Login Success';
        this.bannerType = 'success';
        this.showBanner();
        this.router.navigate([this.redirect.getUserRoute('')]);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err.error.message);
        this.bannerMessage = 'Login failed';
        this.bannerType = 'error';
        this.showBanner();
        console.log(this.bannerMessage);
        this.email = '';
        this.password = '';
        this.cdr.detectChanges();
      }
    });
  }

  protected readonly onkeyup = onkeyup;
}
