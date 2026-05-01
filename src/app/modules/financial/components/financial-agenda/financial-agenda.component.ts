import { Component, OnInit } from '@angular/core';
import { FinancialService } from '../../service/financial.service';
import { FinancialTransaction } from '../../interface/financialTransaction.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-agenda',
  standalone: false,
  templateUrl: './financial-agenda.component.html',
  providers: [MessageService]
})
export class FinancialAgendaComponent implements OnInit {
  transactions: FinancialTransaction[] = [];
  displayDialog: boolean = false;

  isEditing: boolean = false;

  // Objeto para o formulário
  newTransaction: any = {
    type: 'EXPENSE',
    status: 'PENDENTE',
    dueDate: new Date()
  };

  constructor(
    private financialService: FinancialService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.financialService.getAll().subscribe(data => this.transactions = data);
  }
  private handleSuccess(msg: string) {
    // 1. Mostra o balão de sucesso (Toast)
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: msg
    });

    // 2. Fecha a janela modal
    this.displayDialog = false;

    // 3. Recarrega a tabela para mostrar os dados novos/editados
    this.loadTransactions();
  }

  // Ajuste no método Save
  save() {
    if (this.isEditing) {
      this.financialService.update(this.newTransaction.id, this.newTransaction).subscribe({
        next: () => this.handleSuccess('Lançamento atualizado')
      });
    } else {
      this.financialService.registerAdvanced(this.newTransaction).subscribe({
        next: () => this.handleSuccess('Lançamento criado')
      });
    }
  }

  confirmPayment(id: number) {
    this.financialService.confirmPayment(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Pago', detail: 'Pagamento confirmado' });
        this.loadTransactions();
      }
    });
  }

  isOverdue(transaction: FinancialTransaction): boolean {
    return transaction.status === 'PENDENTE' && new Date(transaction.dueDate) < new Date();
  }

  // Função para abrir o formulário em modo Edição
  editTransaction(transaction: FinancialTransaction) {
    this.isEditing = true;
    // Fazemos um clone (...t) para não alterar a tabela antes de salvar
    this.newTransaction = { ...transaction };
    this.displayDialog = true;
  }

  // Função para abrir o formulário em modo Novo
  prepareNewTransaction() {
    this.isEditing = false;
    this.newTransaction = { type: 'EXPENSE', status: 'PENDENTE', dueDate: new Date() };
    this.displayDialog = true;
  }
}