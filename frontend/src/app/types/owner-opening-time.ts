import {Weekday} from './weekday';

export interface OwnerOpeningTime {
  opening_time_id:string;
  weekday:Weekday;
  open_time:string;
  close_time:string;
}
