import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancialService } from '../../service/financial.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-balance-widget',
  standalone: false,
  templateUrl: './financial-balance-widget.component.html',
  styleUrl: './financial-balance-widget.component.scss'
})
export class FinancialBalanceWidgetComponent implements OnInit, OnDestroy {

  balance: number = 0;
  isVisible: boolean = true;
  private updateSubscription: Subscription = new Subscription();

  // Opções de Unidades (mantidas para o visual)
  readonly locations = [
    { label: 'Todas as Unidades', value: 'ALL' },
    { label: 'Loja Centro', value: '1' },
    { label: 'Loja Shopping', value: '2' }
  ];
  selectedLocation: string = 'ALL';

  constructor(private financialService: FinancialService) { }

  ngOnInit(): void {
    this.refreshBalance();

    // Inscrito no "rádio" de atualizações
    this.updateSubscription = this.financialService.update$.subscribe(() => {
      this.refreshBalance();
    });
  }

  refreshBalance() {
    this.financialService.getSummary().subscribe({
      next: (summary) => {
        // AJUSTE: No seu Java o campo é 'balance', não 'netBalance'
        this.balance = summary.netBalance;
      },
      error: (err) => console.error('Erro ao buscar saldo:', err)
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy(): void {
    // ESSENCIAL: Fecha a conexão ao destruir o componente
    this.updateSubscription.unsubscribe();
  }
}