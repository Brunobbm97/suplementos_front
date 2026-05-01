import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interface/product.interface';
import { ConfirmationService, MessageService } from 'primeng/api'; // Certifique-se dos imports
import { ButtonProps } from 'primeng/button';

// O PrimeNG às vezes exporta como ButtonSeverity ou dentro de ButtonProps
// Vamos usar uma técnica de "Type Casting" que é infalível para o compilador
type ButtonSeverity = "success" | "info" | "warning" | "danger" | "help" | "secondary" | "contrast" | null | undefined;

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  displayForm: boolean = false;
  selectedProduct: Product | null = null;

  severityEdit: any = 'warning';
  severityDelete: any = 'danger';

  constructor(private productService: ProductService,
    private confirmationService: ConfirmationService, // Injeção necessária
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
        this.loading = false;
      }
    });
  }

  deleteProduct(product: Product) {
    console.log('Botão de excluir clicado para:', product)
    this.confirmationService.confirm({
      key: 'deleteConfirm',
      message: `Tem certeza que deseja excluir o produto ${product.name}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Não',
      accept: () => {
        this.productService.delete(product.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto excluído' });
            this.loadProducts(); // Recarrega a tabela
          }
        });
      }
    });
  }


  // Método para abrir o formulário (Novo)
  openNew() {
    this.selectedProduct = null;
    this.displayForm = true;
  }

  // Método para abrir o formulário (Editar)
  editProduct(product: Product) {
    this.selectedProduct = { ...product }; // Criamos uma cópia para não alterar a lista antes de salvar
    this.displayForm = true;
  }

  // Método para salvar (chamado pelo evento do filho)
  handleSave(product: Product) {
    if (this.selectedProduct?.id) {
      // Lógica de Update
      this.productService.update(this.selectedProduct.id, product).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado' });
        this.loadProducts();
        this.displayForm = false;
      });
    } else {
      // Lógica de Create
      this.productService.save(product).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto cadastrado' });
        this.loadProducts();
        this.displayForm = false;
      });
    }
  }
}