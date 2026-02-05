import {OwnerOrderItem} from './owner-order-item';
import {OrderStatus} from './order-status';

export interface OwnerOrder {
  restaurant_id: string;
  order_id: string;
  user_id: string;
  total: number;
  status: OrderStatus;
  date:Date; //Format: jjjj-mm-ddThh:mm:ss.sssZ
  items:OwnerOrderItem[];
}
