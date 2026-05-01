import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly API = '/api/v1/locations';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  createLocation(data: any): Observable<any> {
    return this.http.post(this.API, data);
  }

  updateLocation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}