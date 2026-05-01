import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';

@Component({
  selector: 'app-sales-history',
  standalone: false,
  templateUrl: './sales-history.component.html'
})
export class SalesHistoryComponent implements OnInit {
  sales: any[] = [];

  // Controle do Modal de Detalhes (Cupom)
  displayDetails: boolean = false;
  selectedSale: any = null;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.salesService.getSalesHistory().subscribe({
      next: (data) => this.sales = data,
      error: (err) => console.error('Erro ao buscar histórico de vendas', err)
    });
  }

  openDetails(sale: any) {
    this.selectedSale = sale;
    this.displayDetails = true;
  }

  // Traduz o Enum do Back-end para exibição na tela
  getPaymentMethodLabel(method: string): string {
    const methods: any = {
      'PIX': 'PIX',
      'CREDIT_CARD': 'Cartão de Crédito',
      'DEBIT_CARD': 'Cartão de Débito',
      'MONEY': 'Dinheiro Físico'
    };
    return methods[method] || method;
  }

  // Define a cor da tag de pagamento
  getPaymentSeverity(method: string): string {
    if (method === 'PIX') return 'info';
    if (method === 'MONEY') return 'success';
    return 'warning'; // Cartões
  }
}