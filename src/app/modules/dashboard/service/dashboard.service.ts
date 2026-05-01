import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Adicionado HttpParams
import { Observable } from 'rxjs';

export interface DashboardResponse {
  kpis: {
    totalRevenue: number;
    totalExpense: number;
    cashBalance: number;
    expiringProductsCount: number;
  };
  trends: {
    dailyRevenue: Array<{ date: string; amount: number }>;
  };
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly API = '/api/v1/dashboard/summary';

  constructor(private http: HttpClient) { }

  // Agora aceitamos o período como argumento (padrão 'WEEK')
  getSummary(period: string = 'WEEK'): Observable<DashboardResponse> {
    const params = new HttpParams().set('period', period);

    return this.http.get<DashboardResponse>(this.API, { params });
  }
}