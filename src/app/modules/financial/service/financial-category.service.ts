import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialCategoryService {
  private readonly API = '/api/v1/financial-categories'; // Ajuste se usar environment.apiUrl

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(this.API, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}