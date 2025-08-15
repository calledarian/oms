// Allowed order status values
export type OrderStatus = 'pending' | 'packaging' | 'delivering' | 'complete' | 'cancelled';

// Single order row structure
export interface OrderRow {
    id: number;
    orderItems: OrderItem[];
    totalAmount: string;
    status: OrderStatus;
    createdAt: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    images: string[];
    createdAt: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    product: Product;
}

export interface DataGridDemoProps {
    rows?: OrderRow[];
}

export interface GridCellExpandProps {
    value: string;
    width: number;
}