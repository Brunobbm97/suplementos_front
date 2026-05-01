import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API = '/api/v1/products';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}