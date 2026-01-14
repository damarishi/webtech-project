import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    //TODO Fabian: Change URL to backend server?
  private apiUrl = 'http://localhost:3000/api'; // Your Node.js server URL

  constructor(private http: HttpClient) {}

  //fetches data based on category from backend (GET Request)
  async fetchData(category: string): Promise<any[]> {
    console.log(`Fetching data for category: ${category}`);
    const url = `${this.apiUrl}/${category}`;
    return firstValueFrom(this.http.get<any[]>(url));
  }

  //posts data to backend (POST Request)
  async postData(category: string, data: any): Promise<any[]> {
    console.log(`Posting data for category: ${category}`);
    const url = `${this.apiUrl}/${category}`;
    return firstValueFrom(this.http.post<any[]>(url, data));
  }
}