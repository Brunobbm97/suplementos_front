import { Component } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-dashboard-shell',
  standalone: false,
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.scss'
})
export class DashboardShellComponent {
  isCollapsed = true;
  isProductsOpen = false;
  isAdminOpen: boolean = false;
  isSalesOpen: boolean = false;
  isFinancialOpen: boolean = false;

  constructor(public themeService: ThemeService) { }

  toggleSalesMenu() {
    this.isSalesOpen = !this.isSalesOpen;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleProductsMenu() {
    // Se a sidebar estiver fechada e o usuário clicar no ícone, nós abrimos a sidebar primeiro
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.isProductsOpen = true;
    } else {
      // Se já estiver aberta, apenas alterna o submenu
      this.isProductsOpen = !this.isProductsOpen;
    }
  }

  toggleAdminMenu() {
    this.isAdminOpen = !this.isAdminOpen;
    // Opcional: fechar o menu de produtos quando abrir o de admin para não ficar muito longo
    // if (this.isAdminOpen) this.isProductsOpen = false; 
  }

  toggleFinancialMenu() {
    this.isFinancialOpen = !this.isFinancialOpen;

    // Opcional: fechar os outros menus quando abrir o financeiro
    if (this.isFinancialOpen) {
      this.isProductsOpen = false;
      this.isSalesOpen = false;
      this.isAdminOpen = false;
    }
  }
}
