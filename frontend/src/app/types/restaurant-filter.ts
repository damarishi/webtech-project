export interface RestaurantFilter {
  cuisines: string[];
  prices: number[];
  maxMinutes: number;

  sortBy?: 'rating';
  sortDirection?: 'asc' | 'desc';
}
