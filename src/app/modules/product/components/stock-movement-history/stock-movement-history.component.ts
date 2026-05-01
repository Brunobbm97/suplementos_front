import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service';
import { LocationService } from '../../service/location.service'; // Adicione este import
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stock-movement-history',
  standalone: false,
  templateUrl: './stock-movement-history.component.html',
  providers: [MessageService]
})
export class StockMovementHistoryComponent implements OnInit {
  movements: any[] = [];
  locations: any[] = []; // Lista para os dropdowns de filtro
  loading: boolean = true;

  constructor(
    private inventoryService: InventoryService,
    private locationService: LocationService, // Injetar o service de locais
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadHistory();
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        // Mapeamos para um formato que o filtro do PrimeNG entende { label, value }
        this.locations = data.map(l => ({ label: l.name, value: l.name }));

        // Adicionamos as opções especiais que o seu Back-end envia
        this.locations.push({ label: 'ENTRADA EXTERNA', value: 'ENTRADA EXTERNA' });
        this.locations.push({ label: 'SAÍDA (VENDA)', value: 'SAÍDA (VENDA)' });
      }
    });
  }

  loadHistory() {
    this.loading = true;
    this.inventoryService.getMovements().subscribe({
      next: (data) => {
        this.movements = data;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar dados.' });
        this.loading = false;
      }
    });
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'TRANSFER': 'Transferência',
      'ENTRY': 'Entrada (NF)',
      'SALE': 'Venda PDV',
      'ADJUSTMENT': 'Ajuste Manual'
    };
    return labels[type] || type;
  }

  getTypeSeverity(type: string): string {
    switch (type) {
      case 'ENTRY': return 'success';
      case 'TRANSFER': return 'info';
      case 'SALE': return 'warning';
      default: return 'secondary';
    }
  }
}