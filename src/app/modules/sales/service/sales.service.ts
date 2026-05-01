import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleRequest } from '../interface/sales.interface';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly API = '/api/v1/sales';

  constructor(private http: HttpClient) { }

  // Retornando Observable<any> (ou uma interface de resposta, se você tiver criado)
  // O Angular já espera JSON por padrão, então não precisamos passar o responseType
  createSale(request: SaleRequest): Observable<any> {
    return this.http.post<any>(this.API, request);
  }

  getPaymentMethods(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/payment-methods`);
  }

  // Busca todo o histórico de vendas
  getSalesHistory(): Observable<any[]> {
    // Se a sua variável this.API já for '/api/v1/sales', basta isso:
    return this.http.get<any[]>(this.API);
  }
}