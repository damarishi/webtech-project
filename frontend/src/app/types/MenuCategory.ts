import {MenuItem} from './menu-item';

export interface MenuCategory {
  category_id: number;
  category_name: string;
  items: MenuItem[];
}
