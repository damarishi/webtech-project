import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Discount} from '../types/discount';
import {LoyaltyLevel, LoyaltyResponse} from '../types/loyalty-level';

@Injectable({providedIn: 'root'})
export class LoyaltyService {
  constructor(private http: HttpClient) {}

  getLoyaltyDiscount() {
    return this.http.get<Discount>(
      'http://localhost:3000/api/loyalty'
    );
  }

  getProgress() {
    return this.http.get<LoyaltyResponse>(
      'http://localhost:3000/api/loyalty/progress'
    )
  }
}
