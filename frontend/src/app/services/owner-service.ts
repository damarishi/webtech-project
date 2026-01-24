import { Injectable } from '@angular/core';
import {AuthService} from '../features/auth/auth-service';
import {StorageService} from './storage.service';
import {OwnerDataService} from './owner-data-service';
import {OwnerRestaurant} from '../types/owner-restaurant';
import {OwnerApiResponse} from '../types/owner-api-response';
import {OwnerOrder} from '../types/owner-order';
import {OwnerTag} from '../types/owner-tag';
import {OwnerCategory} from '../types/owner-category';
import {OwnerItem} from '../types/owner-item';
import {OwnerOpeningTime} from '../types/owner-opening-time';
import {User} from '../types/user';
import {UserService} from './user-service';
import {firstValueFrom} from 'rxjs';
import {OwnerImage} from '../types/owner-image';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  private url = 'owner/restaurant';

  constructor(private data: OwnerDataService, private auth: AuthService,
              private store: StorageService, private userService:UserService) { }

  //restaurant_id = '';

  /*RESTAURANT START*/
  getRestaurant():Promise<OwnerRestaurant|null>{
    return this.data.get(this.url);
  }

  postRestaurant(restaurant:OwnerRestaurant):Promise<OwnerApiResponse|null>{
    return this.data.post(this.url, restaurant);
  }

  putRestaurant(restaurant:OwnerRestaurant):Promise<OwnerApiResponse|null>{
    if(!restaurant.restaurant_id) return Promise.resolve(null);
    return this.data.put(this.url,restaurant.restaurant_id, restaurant);
  }

  deleteRestaurant(restaurant_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(this.url, restaurant_id);
  }
  /*RESTAURANT END*/


  /*ORDERS START*/
  getAllOrders():Promise<OwnerOrder[]|null>{
    return this.data.get(`${this.url}/orders`);
  }

  getOrder(orderId:string):Promise<OwnerOrder|null>{
    return this.data.get(`${this.url}/order/${orderId}`);
  }

  postOrder(order:OwnerOrder):Promise<OwnerApiResponse|null>{
    return this.data.post(`${this.url}/order`, order);
  }

  putOrder(order:OwnerOrder):Promise<OwnerApiResponse|null>{
    if(!order.order_id) return Promise.resolve(null);
    return this.data.put(`${this.url}/order}`,order.order_id, order);
  }

  deleteOrder(order_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`${this.url}/order}`, order_id);
  }
  /*ORDERS END*/


  /*TAGS START*/
  getAllTags():Promise<OwnerTag[]|null>{
    return this.data.get(`${this.url}/tags`);
  }

  getTag(tagId:string):Promise<OwnerTag|null>{
    return this.data.get(`${this.url}/tag/${tagId}`);
  }

  postTag(tag:OwnerTag):Promise<OwnerApiResponse|null>{
    return this.data.post(`${this.url}/tag`, tag);
  }

  putTag(tag:OwnerTag):Promise<OwnerApiResponse|null>{
    if(!tag.tag_id) return Promise.resolve(null);
    return this.data.put(`${this.url}/tag`,tag.tag_id,tag);
  }

  deleteTag(tag_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`${this.url}/tag`, tag_id);
  }
  /*TAGS END*/


  /*CATEGORIES START*/
  getAllCategories():Promise<OwnerCategory[]|null>{
    return this.data.get(`${this.url}/categories`);
  }

  getCategory(category_id:string):Promise<OwnerCategory|null>{
    return this.data.get(`${this.url}/category/${category_id}`);
  }

  postCategory(category:OwnerCategory):Promise<OwnerApiResponse|null>{
    return this.data.post(`${this.url}/category`, category);
  }

  putCategory(category:OwnerCategory):Promise<OwnerApiResponse|null>{
    if(!category.category_id) return Promise.resolve(null);
    return this.data.put(`${this.url}/category`, category.category_id, category);
  }

  deleteCategory(category_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`${this.url}/category`, category_id);
  }
  /*CATEGORIES END*/


  /*ITEMS START*/
  getAllItems():Promise<OwnerItem[]|null>{
    return this.data.get(`${this.url}/items`);
  }

  getItem(item_id:string):Promise<OwnerItem|null>{
    return this.data.get(`${this.url}/item/${item_id}`);
  }

  postItem(item:OwnerItem):Promise<OwnerApiResponse|null>{
    return this.data.post(`${this.url}/item`, item);
  }

  putItem(item:OwnerItem):Promise<OwnerApiResponse|null>{
    if(!item.item_id) return Promise.resolve(null);
    return this.data.put(`${this.url}/item`, item.item_id, item);
  }

  deleteItem(item_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`${this.url}/item`, item_id);
  }
  /*ITEMS END*/


  /*OPENING-TIMES START*/
  getAllTimes():Promise<OwnerOpeningTime[]|null>{
    return this.data.get(`${this.url}/times`);
  }

  getTime(opening_time_id:string):Promise<OwnerOpeningTime|null>{
    return this.data.get(`${this.url}/time/${opening_time_id}`);
  }

  postTime(time:OwnerOpeningTime):Promise<OwnerApiResponse|null>{
    return this.data.post(`${this.url}/time`, time);
  }

  putTime(time:OwnerOpeningTime):Promise<OwnerApiResponse|null>{
    if(!time.opening_time_id) return Promise.resolve(null);
    return this.data.put(`${this.url}/time`, time.opening_time_id, time);
  }
  deleteTime(opening_time_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`${this.url}/time`, opening_time_id);
  }
  /*OPENING-TIMES END*/

  /*IMAGES START*/
  getImage(image_id:string):Promise<OwnerImage|null>{
    return this.data.get(`image/${image_id}`);
  }

  postImage(image_id:string):Promise<OwnerApiResponse|null>{
    return this.data.post(`image`, image_id);
  }

  deleteImage(image_id:string):Promise<OwnerApiResponse|null>{
    return this.data.delete(`image`, image_id);
  }
  /*IMAGES END*/

  /*PROFILE START*/
  getUser():Promise<User>{
    return firstValueFrom(this.userService.getMe());
  }

  putUser(user:User){
    return firstValueFrom(this.userService.updateMe(user));
  }
  /*PROFILE END*/
}
