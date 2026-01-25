import { Injectable } from '@angular/core';
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

  constructor(private data: OwnerDataService, private userService:UserService) { }

  /*RESTAURANT START*/
  getRestaurant():Promise<OwnerRestaurant>{
    return this.data.get(this.url);
  }

  postRestaurant(restaurant:OwnerRestaurant):Promise<OwnerApiResponse>{
    return this.data.post(this.url, {restaurant});
  }

  putRestaurant(restaurant:OwnerRestaurant):Promise<OwnerApiResponse>{
    if(!restaurant.restaurant_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(this.url,restaurant.restaurant_id, {restaurant});
  }

  deleteRestaurant(restaurant_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(this.url, restaurant_id);
  }
  /*RESTAURANT END*/


  /*ORDERS START*/
  getAllOrders():Promise<{orders: OwnerOrder[]}>{
    return this.data.get(`${this.url}/orders`);
  }

  getOrder(orderId:string):Promise<OwnerOrder>{
    return this.data.get(`${this.url}/order/${orderId}`);
  }

  postOrder(order:OwnerOrder):Promise<OwnerApiResponse>{
    return this.data.post(`${this.url}/order`, {order});
  }

  putOrder(order:OwnerOrder):Promise<OwnerApiResponse>{
    if(!order.order_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(`${this.url}/order}`,order.order_id, {order});
  }

  deleteOrder(order_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(`${this.url}/order}`, order_id);
  }
  /*ORDERS END*/


  /*TAGS START*/
  getAllTags():Promise<{ tags: OwnerTag[] }>{
    return this.data.get(`${this.url}/tags`);
  }

  getTag(tagId:string):Promise<OwnerTag>{
    return this.data.get(`${this.url}/tag/${tagId}`);
  }

  postTag(tag:OwnerTag):Promise<OwnerApiResponse>{
    return this.data.post(`${this.url}/tag`, {tag});
  }

  putTag(tag:OwnerTag):Promise<OwnerApiResponse>{
    if(!tag.tag_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(`${this.url}/tag`,tag.tag_id, {tag});
  }

  deleteTag(tag_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(`${this.url}/tag`, tag_id);
  }
  /*TAGS END*/


  /*CATEGORIES START*/
  getAllCategories():Promise<{ categories: OwnerCategory[] }>{
    return this.data.get(`${this.url}/categories`);
  }

  getCategory(category_id:string):Promise<OwnerCategory>{
    return this.data.get(`${this.url}/category/${category_id}`);
  }

  postCategory(category:OwnerCategory):Promise<OwnerApiResponse>{
    return this.data.post(`${this.url}/category`, {category});
  }

  putCategory(category:OwnerCategory):Promise<OwnerApiResponse>{
    if(!category.category_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(`${this.url}/category`, category.category_id, {category});
  }

  deleteCategory(category_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(`${this.url}/category`, category_id);
  }
  /*CATEGORIES END*/


  /*ITEMS START*/
  getAllItems():Promise<{ items: OwnerItem[] }>{
    return this.data.get(`${this.url}/items`);
  }

  getItem(item_id:string):Promise<OwnerItem>{
    return this.data.get(`${this.url}/item/${item_id}`);
  }

  postItem(item:OwnerItem):Promise<OwnerApiResponse>{
    return this.data.post(`${this.url}/item`, {item});
  }

  putItem(item:OwnerItem):Promise<OwnerApiResponse>{
    if(!item.item_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(`${this.url}/item`, item.item_id, {item});
  }

  deleteItem(item_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(`${this.url}/item`, item_id);
  }
  /*ITEMS END*/


  /*OPENING-TIMES START*/
  getAllTimes():Promise<{ times: OwnerOpeningTime[] }>{
    return this.data.get(`${this.url}/times`);
  }

  getTime(opening_time_id:string):Promise<OwnerOpeningTime>{
    return this.data.get(`${this.url}/time/${opening_time_id}`);
  }

  postTime(time:OwnerOpeningTime):Promise<OwnerApiResponse>{
    return this.data.post(`${this.url}/time`, {time});
  }

  putTime(time:OwnerOpeningTime):Promise<OwnerApiResponse>{
    if(!time.opening_time_id) return Promise.reject(new Error("No ID Found"));
    return this.data.put(`${this.url}/time`, time.opening_time_id, time);
  }
  deleteTime(opening_time_id:string):Promise<OwnerApiResponse>{
    return this.data.delete(`${this.url}/time`, opening_time_id);
  }
  /*OPENING-TIMES END*/

  /*IMAGES START*/
  getImage(image_id:string):Promise<OwnerImage>{
    return this.data.get(`image/${image_id}`);
  }

  postImage(image_id:string):Promise<OwnerApiResponse>{
    return this.data.post(`image`, image_id);
  }

  deleteImage(image_id:string):Promise<OwnerApiResponse>{
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
