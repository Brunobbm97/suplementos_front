import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancialService } from '../../service/financial.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-quick-entry',
  standalone: false,
  templateUrl: './financial-quick-entry.component.html',
  styleUrl: './financial-quick-entry.component.scss'
})
export class FinancialQuickEntryComponent implements OnInit {

  quickForm: FormGroup;
  categories: any[] = [];
  transactionType: 'REVENUE' | 'EXPENSE' = 'EXPENSE'; // Inicia como despesa (botão vermelho)
  statusOptions = [
    { label: 'Já Pago', value: 'PAGO' },
    { label: 'Em Aberto', value: 'PENDENTE' }
  ];

  constructor(
    private fb: FormBuilder,
    private financialService: FinancialService,
    private messageService: MessageService
  ) {
    this.quickForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      categoryName: [null, Validators.required],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.maxLength(100)],
      status: ['PENDENTE'] // Valor inicial
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Carrega as categorias do Back-end para o dropdown
  loadCategories() {
    // Aqui chamaremos seu serviço de categorias. 
    // Ex: this.financialService.getCategories().subscribe(data => this.categories = data);
    this.categories = [
      { label: 'Venda Vitrine', value: 'Venda de Produtos' },
      { label: 'Aluguel', value: 'Aluguel' },
      { label: 'Fornecedor Suplementos', value: 'Compra de Mercadoria' }
    ];
  }

  setType(type: 'REVENUE' | 'EXPENSE') {
    this.transactionType = type;
  }

  save() {
    if (this.quickForm.valid) {
      const data = {
        ...this.quickForm.value,
        type: this.transactionType
      };

      this.financialService.registerAdvanced(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento registrado!' });
          this.quickForm.reset({ dueDate: new Date(), status: 'PAGO' });

          this.financialService.notifyUpdate();
        }
        // O erro é tratado pelo nosso Global Error Interceptor!
      });
    }
  }
}