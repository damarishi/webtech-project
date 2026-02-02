export interface Restaurant {
  restaurant_id: number;
  restaurant_name: string;
  cuisine: 'Italian' | 'Asian' | 'Austrian' | 'Mexican';
  category: 'Restaurant' | 'Cafe' |'FastFood' | 'Bistro';
  priceLevel: 1 | 2 | 3;
  location: {
    x: number;
    y: number;
  }
  distance: number;
  estimatedDeliveryTime: number;
  review_count: number;
  avg_rating: number;
}
