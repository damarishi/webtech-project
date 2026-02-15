import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart-service';
import {Observable} from 'rxjs';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartItem} from '../../../types/cart-item';
import {DiscountService} from '../../../services/discount-service';
import {FormsModule} from '@angular/forms';
import {LoyaltyService} from '../../../services/loyalty-service';
import {ChangeDetectorRef} from '@angular/core';

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
  checkoutClicked = false;


  constructor(
    protected cartService: CartService,
    private discountService: DiscountService,
    private loyaltySerice: LoyaltyService,
    private cdr : ChangeDetectorRef
  ) {
    this.discount$ = this.cartService.discountObs$;
  }

  ngOnInit() {
    this.items$ = this.cartService.items$;
    this.loadLoyaltyDiscount();
  }

  loadLoyaltyDiscount() {
    this.loyaltySerice.getLoyaltyDiscount().subscribe(discount => {
      if (discount) {
        this.cartService.applyDiscount({
          ...discount,
          code: 'LOYALTY',
          period: discount.period
        });
      }
    })
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
    this.checkoutClicked = true;

    this.cartService.checkout().subscribe({
      next: order => {
        console.log('Order created', order);

        setTimeout(() => {
          this.checkoutClicked = false;
        }, 500);

        this.cartService.clearDiscount();
        this.cartService.clear();
        this.discountCode = '';
        this.cdr.markForCheck();
      },
      error: err => {
        console.error(err)
        this.checkoutClicked = false;
      }
    });
  }
}
