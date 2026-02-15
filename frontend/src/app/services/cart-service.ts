import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from '../types/cart-item';
import {HttpClient} from '@angular/common/http';
import {Discount} from '../types/discount';
import { LocalStorageService } from "./local-storage-service";

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.cart$.asObservable();
  private restaurantId: number | null = null;
  private discount$ = new BehaviorSubject<Discount | null>(null)
  readonly discountObs$ = this.discount$.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    //initialize cart from localstorage if exists
    const savedCart = localStorageService.getCart();
    if (savedCart.length > 0) {
      this.cart$.next(savedCart);
    }
  }

  //update localstorage whenever cart changes
  private updateLocalStorageCart() {
    const cart = this.cart$.value;
    this.localStorageService.saveCart(cart);
  }

  public loadCartFromLocalStorage() {
    const savedCart = this.localStorageService.getCart();
    this.cart$.next(savedCart);
  }


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
    this.updateLocalStorageCart();
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
    this.updateLocalStorageCart();
  }

  applyDiscount(discount: Discount) {
    this.discount$.next(discount);
  }

  clearDiscount() {
    this.discount$.next(null);
  }

  clear() {
    this.cart$.next([]);
    this.restaurantId = null;
    this.updateLocalStorageCart();
  }

  getTotal() {
    return this.cart$.value.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  getTotalWithDiscount() {
    const total = this.getTotal();
    const discount = this.discount$.value;

    if (!discount) return total;

    const reduction = total * (discount.value / 100);
    return Math.max(total - reduction, 0);
  }

  checkout() {
    if (!this.restaurantId) {
      throw new Error('No restaurant selected');
    }

    const currentDiscount = this.discount$.value;

    return this.http.post('http://localhost:3000/api/orders', {
      restaurantId: this.restaurantId,
      items: this.cart$.value.map(i => ({
        item_id: i.item_id,
        quantity: i.quantity
      })),
      total: this.getTotalWithDiscount(),
      discountId: currentDiscount?.discount_id ?? null,
      loyaltyPeriod: currentDiscount?.period ?? null,
      fee: 3
    });
  }
}
