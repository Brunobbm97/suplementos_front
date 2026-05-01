import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interface/product.interface';
import { InventoryService } from '../../service/inventory.service';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-stock-management',
  standalone: false,
  templateUrl: './stock-management.component.html'
})
export class StockManagementComponent implements OnInit {
  stockItems: any[] = [];
  products: Product[] = [];

  // 1. O ARRAY AGORA COMEÇA VAZIO PARA RECEBER DO BACK-END
  locations: any[] = [];

  displayEntryForm: boolean = false;
  entryForm: FormGroup;

  // 2. Variável para o novo Filtro Global da Tabela
  globalFilterValue: string = '';

  displayTransferForm: boolean = false;
  transferForm: FormGroup;
  selectedItemForTransfer: any = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private locationService: LocationService,
    private messageService: MessageService
  ) {
    this.entryForm = this.fb.group({
      productId: [null, Validators.required],
      locationId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalCost: [null, [Validators.required, Validators.min(0.01)]],
      newSalePrice: [null],
      expirationDate: [null, Validators.required],
      invoiceNumber: ['']
    });

    this.transferForm = this.fb.group({
      productId: [null, Validators.required],
      sourceLocationId: [null, Validators.required],
      destinationLocationId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      expirationDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStock();
    this.loadProducts();
    this.loadLocations(); // <-- 3. CHAMADA PARA BUSCAR OS LOCAIS
  }

  // Novo método para buscar os Locais do Back-end
  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => this.locations = data,
      error: (err) => console.error('Erro ao buscar locais:', err)
    });
  }

  loadStock() {
    this.inventoryService.getStock().subscribe(data => this.stockItems = data);
  }

  loadProducts() {
    this.productService.findAll().subscribe(data => this.products = data);
  }

  openEntryForm() {
    this.entryForm.reset({ quantity: 1 });
    this.displayEntryForm = true;
  }

  saveEntry() {
    if (this.entryForm.valid) {
      const formValue = { ...this.entryForm.value };
      if (formValue.expirationDate) {
        formValue.expirationDate = formValue.expirationDate.toISOString().split('T')[0];
      }

      this.inventoryService.registerStockEntry(formValue).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Entrada registrada com sucesso!' });
          this.displayEntryForm = false;
          this.loadStock();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao registrar entrada.' });
        }
      });
    }
  }

  // Novo método para aplicar o filtro na tabela
  applyFilterGlobal($event: any, stringVal: string, dt: any) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // Abre o modal injetando os dados da linha selecionada
  openTransferForm(item: any) {
    this.selectedItemForTransfer = item;
    this.transferForm.reset({
      productId: item.productId,
      sourceLocationId: this.locations.find(l => l.name === item.locationName)?.id, // Busca o ID pelo nome
      expirationDate: item.expirationDate,
      quantity: 1
    });
    this.displayTransferForm = true;
  }

  saveTransfer() {
    if (this.transferForm.valid) {
      // Validação de segurança no Front: não transferir mais do que tem
      if (this.transferForm.value.quantity > this.selectedItemForTransfer.quantity) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Quantidade superior ao estoque disponível!' });
        return;
      }

      this.inventoryService.executeTransfer(this.transferForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transferência concluída!' });
          this.displayTransferForm = false;
          this.loadStock();
        },
        error: (err) => {
          const msg = err.error?.error || 'Erro ao realizar transferência.';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
        }
      });
    }
  }
}