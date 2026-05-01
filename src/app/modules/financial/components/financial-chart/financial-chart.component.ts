import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancialService } from '../../service/financial.service';
import { Subscription } from 'rxjs';
import { FinancialTransaction } from '../../interface/financialTransaction.interface';

// Definimos as constantes fora da classe para não "poluir" o código principal
const PERIOD_OPTIONS = [
  { label: 'Este Mês', value: 'MONTH' },
  { label: 'Hoje', value: 'DAY' },
  { label: 'Este Ano', value: 'YEAR' }
];

const STATUS_OPTIONS = [
  { label: 'Liquidado', value: 'PAGO' },
  { label: 'Não Liquidado', value: 'PENDENTE' }
];

@Component({
  selector: 'app-financial-chart',
  standalone: false,
  templateUrl: './financial-chart.component.html',
  styleUrl: './financial-chart.component.scss'
})
export class FinancialChartComponent implements OnInit, OnDestroy {

  chartData: any;
  chartOptions: any;

  // Referenciamos as constantes
  readonly periods = PERIOD_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  selectedPeriod = 'MONTH';
  selectedStatus = 'PAGO';

  private updateSubscription: Subscription = new Subscription();

  constructor(private financialService: FinancialService) { }

  ngOnInit() {
    this.initChartConfig();
    this.loadAndFilterData();

    // Escuta o "rádio" (Subject) para atualizar quando houver novo lançamento
    this.updateSubscription = this.financialService.update$.subscribe(() => {
      this.loadAndFilterData();
    });
  }

  initChartConfig() {
    this.chartOptions = {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#ebedef' } },
        x: { grid: { display: false } }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  // Este método substitui o seu antigo 'updateChartData' com lógica real
  loadAndFilterData() {
    this.financialService.getAll().subscribe({
      next: (transactions) => {
        const filtered = this.applyFilters(transactions);
        this.renderChart(filtered);
      },
      error: (err) => console.error('Erro ao buscar dados do gráfico:', err)
    });
  }

  private applyFilters(list: FinancialTransaction[]): FinancialTransaction[] {
    const now = new Date();

    return list.filter(t => {
      const tDate = new Date(t.dueDate!);

      // Filtro por Status
      const matchStatus = t.status === this.selectedStatus;

      // Filtro por Período
      let matchPeriod = false;
      if (this.selectedPeriod === 'DAY') {
        matchPeriod = tDate.toDateString() === now.toDateString();
      } else if (this.selectedPeriod === 'MONTH') {
        matchPeriod = tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      } else if (this.selectedPeriod === 'YEAR') {
        matchPeriod = tDate.getFullYear() === now.getFullYear();
      }

      return matchStatus && matchPeriod;
    });
  }

  private renderChart(transactions: FinancialTransaction[]) {
    // Agrupa por data para não repetir labels no eixo X
    const sortedData = transactions.sort((a, b) =>
      new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    );

    const labels = [...new Set(sortedData.map(t =>
      new Date(t.dueDate!).toLocaleDateString('pt-BR')
    ))];

    const revenues = labels.map(label =>
      transactions.filter(t => t.type === 'REVENUE' && new Date(t.dueDate!).toLocaleDateString('pt-BR') === label)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const expenses = labels.map(label =>
      transactions.filter(t => t.type === 'EXPENSE' && new Date(t.dueDate!).toLocaleDateString('pt-BR') === label)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Receitas',
          data: revenues,
          fill: true,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4
        },
        {
          label: 'Despesas',
          data: expenses,
          fill: true,
          borderColor: '#f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          tension: 0.4
        }
      ]
    };
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }
}