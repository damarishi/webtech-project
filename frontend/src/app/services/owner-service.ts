import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../features/auth/auth-service';
import {StorageService} from './storage.service';
import {OwnerDataService} from './owner-data-service';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  private url = 'owner';

  constructor(private http: HttpClient, private data: OwnerDataService, private auth: AuthService, private store: StorageService) { }

  restaurant_id = '';


  //TODO: REST-ful Restaurant

  getRestaurantId():boolean{
    if(this.restaurant_id) return true; //ID already present
    const id = this.store.getRestaurantId();
    if(id){
      this.restaurant_id = id;
      return true; //No need to fetch from remote
    }
    const email = this.auth.getEmail();
    this.data.get(`${this.url}/restaurants/${email}`).then(res => {
      this.store.setRestaurantId(res.restaurant_id);
      this.restaurant_id = res.restaurant_id; //Must be present in response
      return true;
    }).catch(err => {
      console.error(err);
      return false;
    });
    return false;//Uh, unreachable?
  }

  getRestaurant(){
    if(!this.getRestaurantId()){
      return;//No Restaurant ID found
    }
    return this.data.get(`${this.url}/restaurants/${this.getRestaurantId()}`);
  }

  //TODO: REST-ful Orders

  //TODO: REST-ful Tags

  //TODO: REST-ful Categories

  //TODO: REST-ful Dishes

  //TODO: REST-ful Profile (GLOBAL?)

  //TODO: REST-ful Opening Times
}
