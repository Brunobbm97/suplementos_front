import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FinancialCategoryService } from '../../../financial/service/financial-category.service' // Ajuste o path

@Component({
  selector: 'app-financial-category',
  standalone: false,
  templateUrl: './financial-category.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './financial-category.component.scss'
})
export class FinancialCategoryComponent implements OnInit {
  categories: any[] = [];

  displayForm: boolean = false;
  categoryForm: FormGroup;
  isEditing: boolean = false;
  currentCategoryId: number | null = null;

  transactionTypes = [
    { label: 'Receita (Entrada)', value: 'REVENUE' },
    { label: 'Despesa (Saída)', value: 'EXPENSE' }
  ];

  constructor(
    private categoryService: FinancialCategoryService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      type: [null, Validators.required] // Trava de segurança: obriga a escolha
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar categorias.' })
    });
  }

  openNew() {
    this.isEditing = false;
    this.currentCategoryId = null;
    this.categoryForm.reset();
    this.displayForm = true;
  }

  editCategory(category: any) {
    this.isEditing = true;
    this.currentCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      type: category.type
    });
    this.displayForm = true;
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const requestData = this.categoryForm.value;

    if (this.isEditing && this.currentCategoryId) {
      this.categoryService.updateCategory(this.currentCategoryId, requestData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada!' });
          this.displayForm = false;
          this.loadCategories();
        },
        error: (err) => {
          const msg = err.error?.error || 'Erro ao atualizar.';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
        }
      });
    } else {
      this.categoryService.createCategory(requestData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria criada!' });
          this.displayForm = false;
          this.loadCategories();
        },
        error: (err) => {
          // Captura a mensagem de "Nome duplicado" que criamos no Spring Boot!
          const msg = err.error?.error || 'Erro ao criar categoria.';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
        }
      });
    }
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a categoria <b>${category.name}</b>?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída!' });
            this.loadCategories();
          },
          error: (err) => {
            const msg = err.error?.error || 'Erro ao excluir. Pode haver transações vinculadas.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
          }
        });
      }
    });
  }
}