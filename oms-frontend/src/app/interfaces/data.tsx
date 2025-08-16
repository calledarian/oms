// Allowed order status values
export type OrderStatus = 'pending' | 'packaging' | 'delivering' | 'complete' | 'cancelled';

// Single order row structure
export interface OrderRow {
    id: number;
    orderItems: OrderItem[];
    totalAmount: string;
    status: OrderStatus;
    address: string;
    phone: string;
    createdAt: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    createdAt: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}
