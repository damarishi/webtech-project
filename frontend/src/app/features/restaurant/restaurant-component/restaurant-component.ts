import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Restaurant } from '../../../types/restaurant';
import { RestaurantService} from '../../../services/restaurant-service';
import {RestaurantList} from '../restaurant-list/restaurant-list';


@Component({
  selector: 'app-restaurant-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-component.html',
  styleUrl: './restaurant-component.css',
})
export class RestaurantComponent {
  @Input()
  restaurant: Restaurant | undefined;

  @Output() deleteSuccess: EventEmitter<number> = new EventEmitter<number>();

  constructor(private restaurantService: RestaurantService) {
  }

  deleteItem() {
    if (this.restaurant) {

    }
  }

}
