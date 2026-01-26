import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart-service';
import {Observable} from 'rxjs';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartItem} from '../../../types/CartItem';
import {DiscountService} from '../../../services/discount-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, FormsModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items$!: Observable<CartItem[]>;
  discountCode = '';
  discountError = '';
  discount$ ;


  constructor(
    protected cartService: CartService,
    private discountService: DiscountService
  ) {
    this.discount$ = this.cartService.discountObs$;
  }



  ngOnInit() {
    this.items$ = this.cartService.items$;
  }

  increase(item: CartItem) {
    this.cartService.increaseItem(item);
  }

  decrease(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  getTotalPrice() {
    return this.cartService.getTotal();
  }

  applyDiscount() {
    this.discountService.validate(this.discountCode).subscribe({
      next: discount => {
        this.cartService.applyDiscount(discount);
        this.discountError = '';
      },
      error: () => {
        this.discountError = 'Invalid discount code';
      }
    })
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: order => {
        console.log('Order created', order);
        this.cartService.clear();
      },
      error: err => console.error(err),
    })
  }
}
