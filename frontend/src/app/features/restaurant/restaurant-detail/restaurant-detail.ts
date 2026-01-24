import {Component, OnInit, signal} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant-service';
import {CommonModule} from '@angular/common';
import {Restaurant} from '../../../types/restaurant';
import {ActivatedRoute} from '@angular/router';
import {Loading} from '../../../shared/ui/loading/loading';
import {Error} from '../../../shared/ui/error/error';
import {Observable} from 'rxjs';
import {MenuCategory} from '../../../types/MenuCategory';
import {CartService} from '../../../services/cart-service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, Loading, Error],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css',
})
export class RestaurantDetail implements OnInit {
  restaurant$!: Observable<Restaurant>;
  menu$!: Observable<MenuCategory[]>;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.restaurant$ = this.restaurantService.getRestaurantById(id);
    this.menu$ = this.restaurantService.getMenu(id);
    console.log(this.menu$);
  }

  addToCart(item: any) {
    this.cartService.addItem({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price
    });
  }

}
