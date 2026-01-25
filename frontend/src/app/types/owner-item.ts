import {OwnerTag} from './owner-tag';
import {OwnerCategory} from './owner-category';
import {OwnerImage} from './owner-image';

export interface OwnerItem {
  item_id:string;
  restaurant_id:string;
  category:OwnerCategory;
  name: string;
  description: string;
  position:number;
  price:number;
  images:OwnerImage[];
  tags:OwnerTag[];
}
