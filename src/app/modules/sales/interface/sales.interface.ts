export interface SaleItemRequest {
    productId: number;
    quantity: number;
    unitPrice: number; // <-- Faltava isso!
}

export interface SaleRequest {
    locationId: number;
    paymentMethod: string; // <-- E faltava isso!
    items: SaleItemRequest[];
}