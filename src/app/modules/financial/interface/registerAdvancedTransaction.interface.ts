export interface FinancialTransactionRequest {
    description: string;
    amount: number;
    type: 'REVENUE' | 'EXPENSE';
    categoryName: string;
    dueDate: Date;
    status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
    notes?: string;
    referenceId?: number; // Opcional para lançamentos manuais
}