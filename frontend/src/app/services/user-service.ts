import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getMe() {
    return this.http.get<User>(`${this.api}/me`);
  }

  updateMe(data: Partial<User>) {
    return this.http.patch<User>(`${this.api}/me`, data);
  }
}
