import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Review} from '../types/review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private baseUrl = 'http://localhost:3000/api/reviews';

  constructor(private http: HttpClient) {}

  getByRestaurant(restaurantId: number) {
    return this.http.get<Review[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  create(review: {
    restaurantId: number;
    rating: number;
    comment: string;
  }) {
    return this.http.post<Review>(this.baseUrl, review);
  }
}
