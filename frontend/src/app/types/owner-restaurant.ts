import {Position} from './position';
import {OwnerImage} from './owner-image';

export interface OwnerRestaurant {
  restaurant_id:string;
  restaurant_name:string;
  location:Position;
  logo:OwnerImage;
  banner:OwnerImage;
}
