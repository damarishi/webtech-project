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

  async updateData(category: string, data: any): Promise<any[]> {
    console.log(`Updating data for category: ${category}`);
    const id = this.getIdentifierKey(data);
    const url = `${this.apiUrl}/${category}/${id}`; // Assuming 'id' is the identifier
    return firstValueFrom(this.http.put<any[]>(url, data));
  }

  async approveRequest(category: string, data: any): Promise<any[]> {
    console.log(`Updating data for category: ${category}`);
    const id = this.getIdentifierKey(data);
    const url = `${this.apiUrl}/${category}/approve/${id}`; // Assuming 'id' is the identifier
    return firstValueFrom(this.http.put<any[]>(url, data));
  }

  async rejectRequest(category: string, data: any): Promise<any[]> {
    console.log(`Updating data for category: ${category}`);
    const id = this.getIdentifierKey(data);
    const url = `${this.apiUrl}/${category}/reject/${id}`; // Assuming 'id' is the identifier
    return firstValueFrom(this.http.put<any[]>(url, data));
  }


  getIdentifierKey(item: any): any {
    const idKey = Object.keys(item).find(key => key.toLowerCase().endsWith('id'));
    if(idKey) {
      console.log(`Test output DataId: ${item[idKey]}`);
      console.log(item);
    }
    return idKey ? item[idKey] : null; 
  }

}