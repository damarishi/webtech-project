import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Restaurant} from '../../../types/restaurant';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  @Input() restaurant!: Restaurant;
}
