import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Discount} from '../types/discount';

@Injectable({providedIn: 'root'})
export class DiscountService {
  constructor(private http: HttpClient) {}

  validate(code: string) {
    return this.http.post<Discount>(
      'http://localhost:3000/api/discounts/validate',
      {code}
    );
  }
}
