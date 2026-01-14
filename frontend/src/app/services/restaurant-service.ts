import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const restaurantsURL = 'http://localhost:3000/api/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get(`${restaurantsURL}`);
  }

}
