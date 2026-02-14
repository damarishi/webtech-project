import {Position} from './position';

export interface RestaurantRequest {
  request_id: string;
  restaurant_name: string;
  requested_by: string;
  requested_at: Date;
  status_id: Number;
  admin_notes: string;
  location: Position;
}
