import {Component, OnInit, signal} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant-service';
import {CommonModule} from '@angular/common';
import {Restaurant} from '../../../types/restaurant';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuCategory} from '../../../types/menu-category';
import {CartService} from '../../../services/cart-service';
import {Review} from '../../../types/review';
import {ReviewService} from '../../../services/review-service';
import {FormsModule} from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css',
})
export class RestaurantDetail implements OnInit {
  restaurant$!: Observable<Restaurant>;
  restaurantId!: number;
  menu$!: Observable<MenuCategory[]>;
  reviews$!: Observable<Review[]>;
  rating = 5;
  comment = '';
  addedItems = new Set<number>();
  reviewSaved = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.restaurantId = id;

    this.restaurant$ = this.restaurantService.getRestaurantById(id);
    console.log("Before Fetch Menu");
    this.menu$ = this.restaurantService.getMenu(id);
    this.menu$.subscribe();
    console.log("After Fetch Menu: ", this.menu$);
    this.reviews$ = this.reviewService.getByRestaurant(id);
    console.log(this.menu$);
  }

  addToCart(item: any) {
    this.cartService.addItem({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price
      },
      this.restaurantId   //kommt aus Route / restaurant$
    );

    this.addedItems.add(item.item_id);

    setTimeout(() => {
      this.addedItems.delete(item.item_id);
      this.cdr.markForCheck();
    }, 1000);
  }

  submitReview() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.reviewService.create({
      restaurantId: id,
      rating: this.rating,
      comment: this.comment
    }).subscribe(() => {

      this.comment = '';
      this.rating = 5;

      this.reviews$ = this.reviewService.getByRestaurant(id);

      this.cdr.markForCheck();
    });

  }

}
