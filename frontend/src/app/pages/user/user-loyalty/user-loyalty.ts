import { Component } from '@angular/core';
import {UserRoles} from '../../../types/user-roles';
import {Navbar} from '../../../shared/ui/navbar/navbar';
import {LoyaltyService} from '../../../services/loyalty-service';
import {AsyncPipe, CurrencyPipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-user-loyalty',
  imports: [Navbar, AsyncPipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './user-loyalty.html',
  styleUrl: './user-loyalty.css',
})
export class UserLoyalty {
  title: String = "Loyalty Points";
  protected readonly UserRoles = UserRoles;

  levels$;

  constructor(private loyaltyService: LoyaltyService) {
    console.log('Loyalty Service loaded');
    this.levels$ = this.loyaltyService.getProgress();
  }
}
