import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Restaurant} from '../types/restaurant';
import {MenuCategory} from '../types/MenuCategory';

const restaurantsURL = 'http://localhost:3000/api/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get<Restaurant>(`${restaurantsURL}`);
  }

  getDashboardRestaurants(maxMinutes: number) {
    return this.http.get<Restaurant[]>(`${restaurantsURL}`,
      { params: maxMinutes ? { maxMinutes } : {} }
    );
  }

  getRestaurantById(id: number) {
    return this.http.get<Restaurant>(`${restaurantsURL}/${id}`);
  }

  getMenu(restaurantId: number): Observable<MenuCategory[]> {
    return this.http
      .get<any[]>(`${restaurantsURL}/${restaurantId}/menu`)
      .pipe(map(data => this.groupMenu(data)));
  }

  private groupMenu(data: any[]): MenuCategory[] {
    const map = new Map<number, MenuCategory>();

    for (const row of data) {
      if (!map.has(row.category_id)) {
        map.set(row.category_id, {
          category_id: row.category_id,
          category_name: row.category_name,
          items: []
        });
      }

      map.get(row.category_id)!.items.push({
        item_id: row.item_id,
        item_name: row.item_name,
        price: row.price,
        tags: row.tags
      });
    }

    return Array.from(map.values());
  }
}
