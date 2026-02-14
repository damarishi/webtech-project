
import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  
  // --- Cart Logic --- 
  saveCart(cart: any[]): void {
    localStorage.setItem('local_storage_cart', JSON.stringify(cart));
  }

  getCart(): any[] {
    const cart = localStorage.getItem('local_storage_cart');
    return cart ? JSON.parse(cart) : [];      //TODO Fabian: probably change return
  }

  removeCart(): void {
    localStorage.removeItem('local_storage_cart');
  }

  // --- Menu Logic ---
  // unsure if localstorage is best for Menu caching, but it is simple and should work for now.
  saveMenuBackup(restaurantId: number, menu: any[]): void {
    const data = {
      restaurantId: restaurantId,
      menu: menu
    }
    localStorage.setItem('last_visited_restaurant_menu', JSON.stringify(data));    //save menu
  }

  getRestaurantIdBackup(){
    const rawData = localStorage.getItem(`last_visited_restaurant_menu`);
    if(!rawData)
    {
      return null;
    }
    try {
      const data = JSON.parse(rawData);
      console.log('2. Parsed Data from Local Storage Menu: ', data);
      return data.restaurantId;
    }
    catch (e) {
      console.error("Error parsing Local Storage Menu Backup", e);
    }
  }

  getMenuBackup(restaurantId: number): any | null {
    const rawData = localStorage.getItem(`last_visited_restaurant_menu`);
    //console.log('1. Raw Data from Local Storage Menu: ', rawData);
    if(!rawData) 
      {
        console.log('1.1. Error: No Raw Data Found');
        return null;
      }

    try {
      const data = JSON.parse(rawData);
      //console.log('2. Parsed Data from Local Storage Menu: ', data);
      if(data.restaurantId == restaurantId) 
      {
        //console.log('3. Match Found: ', data.restaurantId);
        console.log(data.menu);
        return data.menu;
      }
       
    }
    catch (e) {
      console.error("Error parsing Local Storage Menu Backup", e);
    }
    //Id didn't match, parsing error or others, return null
    return null;
  }
} 
