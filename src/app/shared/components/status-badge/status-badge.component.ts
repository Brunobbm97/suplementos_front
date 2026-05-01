import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: false,
  templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  // Mapeamento de severidade do PrimeNG
  get severity(): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    const map: { [key: string]: any } = {
      'ATIVO': 'success',
      'VENCIDO': 'danger',
      'CRITICO': 'warning',
      'SEM_ESTOQUE': 'secondary',
      'EM_TRANSITO': 'info'
    };
    return map[this.status] || 'info';
  }

  get label(): string {
    return this.status.replace('_', ' ');
  }
}