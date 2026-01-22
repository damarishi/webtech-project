import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  //TODO: Move all SessionStorage related operations here

  setRestaurantId(id:string){
    sessionStorage.setItem('restaurant_id', id);
  }

  getRestaurantId(){
    return sessionStorage.getItem('restaurant_id');
  }

}
