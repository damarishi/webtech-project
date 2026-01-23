import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart-service';
import {Observable} from 'rxjs';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartItem} from '../../../types/CartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items$!: Observable<CartItem[]>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items$ = this.cartService.items$;
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  getTotalPrice() {
    return this.cartService.getTotal();
  }
}
