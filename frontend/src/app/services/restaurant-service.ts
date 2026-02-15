import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap, catchError, of} from 'rxjs';
import {Restaurant} from '../types/restaurant';
import {MenuCategory} from '../types/menu-category';
import { LocalStorageService } from './local-storage-service';


const restaurantsURL = 'http://localhost:3000/api/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {}


  getDashboardRestaurants(
    maxMinutes: number,
    sortBy?: string,
    sortDirection?: string
  ) {
    return this.http.get<Restaurant[]>(`${restaurantsURL}`,
      {
        params: {
          maxMinutes,
          sortBy: sortBy ?? '',
          sortDirection: sortDirection ?? ''
        }
      }
    );
  }

  getRestaurantById(id: number) {
    return this.http.get<Restaurant>(`${restaurantsURL}/${id}`)
    .pipe(
      catchError( () => {
        console.log("RestaurantId could not get fetched, checking local Storage for Id");
        return of(this.localStorageService.getRestaurantIdBackup());
      })
    );
  }

  getMenu(restaurantId: number): Observable<MenuCategory[]> {
    //console.log("Hello GetMenu Service!");
    return this.http
      .get<any[]>(`${restaurantsURL}/${restaurantId}/menu`)
      .pipe(
        tap( () => console.log("Got Data")),
        map(data => this.groupMenu(data)),
        tap(groupedMenu => {      //saved grouped Menu to localstorage
          console.log("Saving Menu to Local Storage");
          this.localStorageService.saveMenuBackup(restaurantId, groupedMenu);
        }),
        catchError(error => {     //if the backend is not reachable, check for local storage Menus
          console.log('API connection failed, checking local Storage...');
          const backup = this.localStorageService.getMenuBackup(restaurantId);

          return backup ? of(backup) : of([]);  //Maybe change else return value
        })
      );
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
