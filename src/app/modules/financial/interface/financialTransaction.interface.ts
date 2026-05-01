export interface FinancialTransaction {
    id?: number;
    description: string;
    amount: number;
    type: 'REVENUE' | 'EXPENSE';
    status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
    categoryName: string;
    dueDate: Date;
    paymentDate?: Date;
    notes?: string;
}