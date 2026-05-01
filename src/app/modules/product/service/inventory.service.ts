import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly API = '/api/v1/inventory';

  constructor(private http: HttpClient) { }

  // Listagem geral do que tem nas prateleiras
  getStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/stock`);
  }

  // O rastro de quem moveu o quê (que vamos usar na tela de histórico)
  getMovements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/movements`);
  }

  // Transferência entre unidades
  executeTransfer(transferData: any): Observable<any> {
    return this.http.post(`${this.API}/transfer`, transferData);
  }

  // Entrada de mercadoria via NF
  registerStockEntry(entryData: any): Observable<void> {
    return this.http.post<void>(`${this.API}/stock/entries`, entryData);
  }

  // Busca para o PDV (Frente de Caixa)
  searchStockForPos(locationId: number, query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/stock/pos-search`, {
      params: { locationId: locationId.toString(), query: query }
    });
  }

  // Alerta de validade
  getExpiringItems(days: number = 30): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/reports/expiring?days=${days}`);
  }
}