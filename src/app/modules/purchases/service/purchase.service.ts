import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseRequest } from '../interface/purchase.interface';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private readonly API = '/api/v1/purchases';
  constructor(private http: HttpClient) { }

  registerPurchase(request: PurchaseRequest): Observable<string> {
    return this.http.post(this.API, request, { responseType: 'text' });
  }
}