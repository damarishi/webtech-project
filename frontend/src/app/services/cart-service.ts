import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from '../types/CartItem';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);

  readonly items$ = this.cart$.asObservable();

  addItem(item: Omit<CartItem, 'quantity'>) {
    const cart = this.cart$.value;
    const existing = cart.find(i => i.item_id === item.item_id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({...item, quantity: 1});
    }

    this.cart$.next([...cart]);
  }

  removeItem(itemId: number) {
    this.cart$.next(
      this.cart$.value.filter(i => i.item_id !== itemId)
    );
  }

  clear() {
    this.cart$.next([]);
  }

  getTotal() {
    return this.cart$.value.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }
}
