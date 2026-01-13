import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FetchDataService {
    //TODO Fabian: Change URL to backend server?
  private apiUrl = 'http://localhost:3000/api'; // Your Node.js server URL

  constructor(private http: HttpClient) {}

  async fetchData(category: string): Promise<any[]> {
    console.log(`Fetching data for category: ${category}`);
    const url = `${this.apiUrl}/${category}`;
    return firstValueFrom(this.http.get<any[]>(url));
  }
}