export interface RestaurantFilter {
  cuisines: string[];
  categories: string[];
  prices: number[];
  maxMinutes: number;

  sortBy?: 'rating';
  sortDirection?: 'asc' | 'desc';
}
