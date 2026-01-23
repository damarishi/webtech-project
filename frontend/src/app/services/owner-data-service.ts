import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerDataService {
  private apiUrl = 'http://localhost:3000/api'; // Your Node.js server URL

  constructor(private http: HttpClient) {}

  /**
   * Get Collection or Element from Collection
   */
  async get(category: string): Promise<any> {
    console.log(`Fetching data for category: ${category}`);
    const url = `${this.apiUrl}/${category}`;
    return firstValueFrom(this.http.get<any>(url));
  }

  /**
   * Add Element to collection
   */
  async post(category: string, data: any): Promise<any> {
    console.log(`Posting data for category: ${category}`);
    const url = `${this.apiUrl}/${category}`;
    return firstValueFrom(this.http.post<any>(url, data));
  }

  /**
   * Replace Element in Collection
   */
  async put(category: string, id:string, data: any): Promise<any> {
    console.log(`Updating data for category: ${category}`);
    const url = `${this.apiUrl}/${category}/${id}`; // Assuming 'id' is the identifier
    return firstValueFrom(this.http.put<any>(url, data));
  }

  /**
   * Remove Element from Collection
   */
  async delete(category: string, id:string): Promise<any> {
    console.log(`Deleting data for category: ${category}`);
    const url = `${this.apiUrl}/${category}/${id}`; // Assuming 'id' is the identifier
    return firstValueFrom(this.http.delete<any>(url));
  }
}
