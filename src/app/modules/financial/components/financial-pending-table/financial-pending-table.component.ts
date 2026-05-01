import { Component, OnInit } from '@angular/core';
import { FinancialService } from '../../service/financial.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-pending-table',
  standalone: false,
  templateUrl: './financial-pending-table.component.html',
  styleUrl: './financial-pending-table.component.scss'
})
export class FinancialPendingTableComponent implements OnInit {

  pendingTransactions: any[] = [];
  loading: boolean = false;

  constructor(
    private financialService: FinancialService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending() {
    this.loading = true;
    this.financialService.getAll().subscribe(data => {
      // Filtramos apenas o que NÃO está pago (PENDENTE)
      this.pendingTransactions = data.filter(t => t.status === 'PENDENTE');
      this.loading = false;
    });
  }

  // Lógica das cores baseada na data de vencimento
  getStatusClass(dueDate: string | Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dueDate);
    date.setHours(0, 0, 0, 0);

    if (date < today) return 'border-red';    // Atrasado
    if (date.getTime() === today.getTime()) return 'border-green'; // Hoje
    return 'border-blue'; // Futuro
  }

  liquidar(id: number) {
    this.financialService.confirmPayment(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Liquidação', detail: 'Pagamento confirmado!' });
        this.loadPending(); // Recarrega a lista para sumir o item pago
      }
    });
  }
}