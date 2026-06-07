import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { AuthService } from '../../../auth/service/auth-service.service'; // Ajuste o caminho se necessário
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard-shell',
  standalone: false,
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.scss'
})
export class DashboardShellComponent implements OnInit {
  isCollapsed = true;
  isProductsOpen = false;
  isAdminOpen: boolean = false;
  isSalesOpen: boolean = false;
  isFinancialOpen: boolean = false;

  // Variável que vai guardar as opções do menu do usuário
  userMenuItems: MenuItem[] | undefined;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService // Injetando o nosso serviço de segurança
  ) { }

  ngOnInit() {
    // Construindo o menu flutuante
    this.userMenuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => {
          // Aqui no futuro chamaremos a rota de perfil
          console.log('Navegar para o perfil');
        }
      },
      { separator: true }, // Uma linha sutil para separar as opções
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          // A mágica acontece aqui! Chama a função que limpa o token e redireciona
          this.authService.logout();
        }
      }
    ];
  }

  toggleSalesMenu() {
    this.isSalesOpen = !this.isSalesOpen;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleProductsMenu() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.isProductsOpen = true;
    } else {
      this.isProductsOpen = !this.isProductsOpen;
    }
  }

  toggleAdminMenu() {
    this.isAdminOpen = !this.isAdminOpen;
  }

  toggleFinancialMenu() {
    this.isFinancialOpen = !this.isFinancialOpen;
    if (this.isFinancialOpen) {
      this.isProductsOpen = false;
      this.isSalesOpen = false;
      this.isAdminOpen = false;
    }
  }
}