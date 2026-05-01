import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product/service/product.service';
import { SalesService } from '../../service/sales.service';
import { LocationService } from '../../../product/service/location.service';
import { InventoryService } from '../../../product/service/inventory.service';
import { Product } from '../../../product/interface/product.interface';
import { SaleRequest } from '../../interface/sales.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pdv',
  standalone: false,
  templateUrl: './pdv.component.html',
  providers: [MessageService]
})
export class PdvComponent implements OnInit {
  cart: any[] = [];
  totalSale: number = 0;

  searchQuery: string = '';
  foundProducts: any[] = [];

  selectedPayment: string | null = null;
  paymentOptions: any[] = [];

  locations: any[] = [];
  selectedLocation: number = 0;
  previousLocation: number = 0; // <-- Nova variável para controle de reversão

  constructor(
    private productService: ProductService,
    private salesService: SalesService,
    private locationService: LocationService,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService, // Injetado corretamente
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadLocations();
    this.loadPaymentMethods();
  }

  searchProduct() {
    if (this.searchQuery.length > 2) {
      this.inventoryService.searchStockForPos(this.selectedLocation, this.searchQuery)
        .subscribe({
          next: (products) => {
            this.foundProducts = products;
          },
          error: (err) => console.error('Erro ao buscar estoque', err)
        });
    } else {
      this.foundProducts = [];
    }
  }

  addToCart(product: any) {
    const existing = this.cart.find(item => item.productId === product.productId);

    if (existing) {
      if (existing.quantity < product.quantity) {
        existing.quantity++;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Estoque Insuficiente',
          detail: `Temos apenas ${product.quantity} unidade(s) de ${product.productName} nesta loja.`
        });
        return;
      }
    } else {
      this.cart.push({
        productId: product.productId,
        name: product.productName,
        price: product.salePrice,
        quantity: 1
      });
    }
    this.calculateTotal();
    this.searchQuery = '';
    this.foundProducts = [];
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalSale = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  finishSale() {
    const request: SaleRequest = {
      locationId: this.selectedLocation,
      paymentMethod: this.selectedPayment!,
      items: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    this.salesService.createSale(request).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda finalizada com sucesso!' });
        this.cart = [];
        this.totalSale = 0;
        this.selectedPayment = null;
      },
      error: (err) => {
        const errorMsg = err.error?.error || 'Erro ao processar a venda.';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMsg });
      }
    });
  }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        if (this.locations.length > 0) {
          this.selectedLocation = this.locations[0].id;
          this.previousLocation = this.selectedLocation; // <-- Define o local inicial como referência
        }
      },
      error: (err) => console.error('Erro ao carregar lojas', err)
    });
  }

  loadPaymentMethods() {
    this.salesService.getPaymentMethods().subscribe({
      next: (data) => {
        this.paymentOptions = data;
      },
      error: (err) => console.error('Erro ao carregar pagamentos', err)
    });
  }

  /**
   * NOVA LÓGICA: Com janela de confirmação
   */
  onLocationChange() {
    // 1. Se o carrinho estiver vazio, troca o local sem perguntar
    if (this.cart.length === 0) {
      this.previousLocation = this.selectedLocation;
      this.foundProducts = [];
      this.searchQuery = '';
      return;
    }

    // 2. Se houver itens, pede confirmação do operador
    this.confirmationService.confirm({
      message: 'Ao alterar o local de venda, os itens atuais do carrinho serão removidos para validar o estoque da nova unidade. Deseja continuar?',
      header: 'Confirmação de Alteração',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, limpar e trocar',
      rejectLabel: 'Não, manter atual',
      accept: () => {
        // O usuário aceitou: limpamos tudo
        this.cart = [];
        this.totalSale = 0;
        this.foundProducts = [];
        this.searchQuery = '';
        this.previousLocation = this.selectedLocation; // Atualiza a referência

        this.messageService.add({
          severity: 'info',
          summary: 'Carrinho Resetado',
          detail: 'Unidade alterada com sucesso.'
        });
      },
      reject: () => {
        // O usuário desistiu: voltamos o valor do dropdown para o que era antes
        this.selectedLocation = this.previousLocation;
      }
    });
  }
}