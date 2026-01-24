import {OwnerItem} from './owner-item';

export interface OwnerOrder {
  order_id: string;
  user_id: string;
  total: number;
  date:Date;
  items:OwnerItem[];
}
