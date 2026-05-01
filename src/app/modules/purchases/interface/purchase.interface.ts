export interface PurchaseItemRequest {
    productId: number;
    quantity: number;
    unitCost: number;
}

export interface PurchaseRequest {
    supplier: string;
    destinationLocationId: number;
    items: PurchaseItemRequest[];
}