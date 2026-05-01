export interface Product {
    id?: number;
    name: string;
    sku: string;
    description?: string;
    brand: string;
    flavor?: string;
    salePrice: number;
    costPrice: number;
}

export interface StockTransfer {
    productId: number;
    sourceLocationId: number;
    destinationLocationId: number;
    quantity: number;
}

export interface InventoryItem {
    id: number;
    productName: string; // Nome do produto associado
    sku: string;
    quantity: number;
    expirationDate: Date;
    locationName: string;
}