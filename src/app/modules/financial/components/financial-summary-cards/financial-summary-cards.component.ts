import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancialService } from '../../service/financial.service';
import { Subscription } from 'rxjs';
import { FinancialSummary } from '../../interface/financial.interface'

@Component({
  selector: 'app-financial-summary-cards',
  standalone: false,
  templateUrl: './financial-summary-cards.component.html',
  styleUrl: './financial-summary-cards.component.scss'
})
export class FinancialSummaryCardsComponent implements OnInit, OnDestroy {

  // Objeto que armazenará os dados reais vindos do Java
  summary: FinancialSummary = {
    totalRevenue: 0,
    totalExpense: 0,
    netBalance: 0
  };

  private updateSubscription: Subscription = new Subscription();

  // Configurações das mini-ondas (Sparklines) mantidas
  sparklineOptions = {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    maintainAspectRatio: false,
    responsive: true,
    elements: { point: { radius: 0 } }
  };

  // Por enquanto mantemos os desenhos das ondas simulados, 
  // mas os números (que é o que importa agora) virão do summary.
  revenueData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{ data: [10, 25, 15, 30, 40], borderColor: '#4caf50', tension: 0.4, fill: false }]
  };

  expenseData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{ data: [40, 30, 45, 20, 35], borderColor: '#f44336', tension: 0.4, fill: false }]
  };

  constructor(private financialService: FinancialService) { }

  ngOnInit(): void {
    this.fetchSummary();

    // Fica ouvindo o "rádio" (Subject) do serviço. 
    // Quando o lançamento rápido salvar, ele dispara esse fetchSummary() sozinho!
    this.updateSubscription = this.financialService.update$.subscribe(() => {
      this.fetchSummary();
    });
  }

  fetchSummary(): void {
    this.financialService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
      },
      error: (err) => console.error('Erro ao carregar resumo financeiro:', err)
    });
  }

  ngOnDestroy(): void {
    // Boa prática de CC: limpa a inscrição ao sair da tela para evitar lentidão
    this.updateSubscription.unsubscribe();
  }
}