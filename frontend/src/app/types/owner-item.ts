import {OwnerTag} from './owner-tag';

export interface OwnerItem {
  item_id:string;
  category_id:string;
  name: string;
  description: string;
  position:number;
  price:number;
  tags:OwnerTag[];
}
