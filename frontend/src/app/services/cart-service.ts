import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from '../types/CartItem';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.cart$.asObservable();
  private restaurantId: number | null = null;

  constructor(private http: HttpClient) {}

  addItem(
    item: Omit<CartItem, 'quantity'>,
     restaurantId: number
  ){
    if (this.restaurantId && this.restaurantId !== restaurantId) {
      throw new Error('Cart already contains items from another restaurant');
    }

    if (!this.restaurantId) {
      this.restaurantId = restaurantId;
    }

    const cart = this.cart$.value;
    const existing = cart.find(i => i.item_id === item.item_id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({...item, quantity: 1});
    }

    this.cart$.next([...cart]);
  }

  increaseItem(item: CartItem){
    item.quantity++;
  }

  removeItem(itemId: number) {
    const cart = this.cart$.value.map(item => {
      if (item.item_id === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.cart$.next(cart);
  }

  clear() {
    this.cart$.next([]);
    this.restaurantId = null;
  }

  getTotal() {
    return this.cart$.value.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  checkout() {
    if (!this.restaurantId) {
      throw new Error('No restaurant selected');
    }

    return this.http.post('http://localhost:3000/api/orders', {
      restaurantId: this.restaurantId,
      items: this.cart$.value.map(i => ({
        item_id: i.item_id,
        quantity: i.quantity
      })),
      total: this.getTotal(),
      discountId: null,
      fee: 3
    });
  }
}
