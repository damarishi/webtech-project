import {OwnerItem} from './owner-item';
import {OrderStatus} from './order-status';

export interface OwnerOrder {
  order_id: string;
  user_id: string;
  total: number;
  status: OrderStatus;
  date:Date; //Format: jjjj-mm-ddThh:mm:ss.sssZ
  items:OwnerItem[];
}
