import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardResponse } from '../../service/dashboard.service';
import { InventoryService } from '../../../product/service/inventory.service';
import { InventoryItem } from '../../../product/interface/product.interface';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit {
  // Dados do Dashboard (KPIs e Gráficos)
  dashboardData?: DashboardResponse;

  // Detalhes da Tabela (Mantemos a chamada específica para ver a lista de itens)
  expiringProducts: InventoryItem[] = [];
  loadingItems: boolean = true;

  // Configurações do Gráfico
  chartData: any;
  chartOptions: any;

  selectedPeriod: string = 'WEEK';
  periodOptions = [
    { label: 'Hoje', value: 'TODAY' },
    { label: '7 Dias', value: 'WEEK' },
    { label: 'Mês', value: 'MONTH' }
  ];

  constructor(
    private dashboardService: DashboardService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadExpiringProducts();
    this.initChartOptions();
  }

  loadDashboardData() {
    this.dashboardService.getSummary(this.selectedPeriod).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.prepareChartData(data.trends.dailyRevenue);
      }
    });
  }

  prepareChartData(dailyRevenue: any[]) {
    this.chartData = {
      // Aqui acontece a mágica da formatação
      labels: dailyRevenue.map(item => {
        // 1. Criamos um objeto Date (adicionando o T00:00 para evitar erro de fuso horário)
        const dateObj = new Date(item.date + 'T00:00:00');

        // 2. Formatamos para "dia de mês" (ex: 15 mar.)
        return new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'short'
        }).format(dateObj).replace('.', ''); // Opcional: remove o ponto do mês abreviado
      }),

      datasets: [
        {
          label: 'Faturamento Diário',
          data: dailyRevenue.map(item => item.amount),
          fill: true, // Vamos deixar uma sombra abaixo da linha
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)', // Azul bem clarinho com transparência
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3B82F6',
          tension: 0.4
        }
      ]
    };
  }

  initChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context: any) => ` Faturamento: R$ ${context.parsed.y.toLocaleString('pt-BR')}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false } // Remove as linhas verticais
        },
        y: {
          beginAtZero: true,
          border: { display: false },
          ticks: {
            callback: (value: any) => 'R$ ' + value
          }
        }
      }
    };
  }

  loadExpiringProducts() {
    this.inventoryService.getExpiringItems(30).subscribe({
      next: (data) => {
        this.expiringProducts = data;
        this.loadingItems = false;
      },
      error: (err) => {
        console.error('Erro nos alertas de validade', err);
        this.loadingItems = false;
      }
    });
  }

  onPeriodChange() {
    this.loadDashboardData(); // Recarrega tudo quando o usuário clica
  }


}