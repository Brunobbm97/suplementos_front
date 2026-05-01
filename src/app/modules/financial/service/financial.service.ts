import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FinancialSummary } from '../interface/financial.interface';
import { FinancialTransaction } from '../interface/financialTransaction.interface';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private readonly API = '/api/v1/financial';

  private _updateSource = new Subject<void>();
  update$ = this._updateSource.asObservable();

  constructor(private http: HttpClient) { }

  notifyUpdate() {
    this._updateSource.next();
  }

  getSummary(): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.API}/balance`);
  }

  // Novo: Busca todas as transações (com filtros se necessário no futuro)
  getAll(): Observable<FinancialTransaction[]> {
    return this.http.get<FinancialTransaction[]>(this.API);
  }

  // Novo: Cadastro avançado para a Agenda
  registerAdvanced(transaction: FinancialTransaction): Observable<void> {
    return this.http.post<void>(`${this.API}/advanced`, transaction);
  }

  // Novo: Método para "Dar Baixa" (Confirmar Pagamento)
  confirmPayment(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/confirm`, {});
  }

  update(id: number, transaction: FinancialTransaction): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}`, transaction);
  }
}