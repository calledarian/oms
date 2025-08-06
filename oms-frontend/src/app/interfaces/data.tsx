// Allowed order status values
export type OrderStatus = 'pending' | 'packaging' | 'delivering' | 'complete' | 'cancelled';

// Single order row structure
export interface OrderRow {
    id: number;
    productId: number;          // Product reference ID
    quantity: number;
    address: string;
    phone: string;
    createdAt: string;          // ISO date string
    status: OrderStatus;
    totalPrice: string;         // Total price as string (can change to number if preferred)
    isArchived: boolean;        // Whether order is archived or not
}

export interface DataGridDemoProps {
    rows?: OrderRow[];
}

export const testData: OrderRow[] = [
    { id: 1, productId: 101, quantity: 3, address: "123 Maple St, Springfield", phone: "012 345 678", createdAt: "2025-08-06T00:00:00Z", status: "pending" as OrderStatus, totalPrice: "30", isArchived: false },
    { id: 2, productId: 102, quantity: 1, address: "456 Elm St, Phnom Penh", phone: "097 654 321", createdAt: "2025-08-04T00:00:00Z", status: "pending" as OrderStatus, totalPrice: "10", isArchived: false },
    { id: 3, productId: 103, quantity: 5, address: "789 Oak Ave, Siem Reap", phone: "085 112 233", createdAt: "2025-08-03T00:00:00Z", status: "packaging" as OrderStatus, totalPrice: "50", isArchived: false },
    { id: 4, productId: 104, quantity: 2, address: "321 Pine Blvd, Battambang", phone: "093 778 899", createdAt: "2025-08-01T00:00:00Z", status: "delivering" as OrderStatus, totalPrice: "20", isArchived: false },
    { id: 5, productId: 105, quantity: 4, address: "654 Coconut Rd, Kampot", phone: "096 889 900", createdAt: "2025-07-29T00:00:00Z", status: "complete" as OrderStatus, totalPrice: "40", isArchived: true },
    { id: 6, productId: 106, quantity: 1, address: "88 Mango St, Takeo", phone: "092 556 677", createdAt: "2025-08-06T00:00:00Z", status: "pending" as OrderStatus, totalPrice: "10", isArchived: false },
    { id: 7, productId: 107, quantity: 10, address: "23 Banana Rd, Sihanoukville", phone: "011 223 344", createdAt: "2025-08-07T00:00:00Z", status: "cancelled" as OrderStatus, totalPrice: "100", isArchived: false },
    { id: 8, productId: 108, quantity: 6, address: "9 Cherry Ln, Kandal", phone: "010 789 456", createdAt: "2025-08-06T00:00:00Z", status: "pending" as OrderStatus, totalPrice: "60", isArchived: false },
    { id: 9, productId: 109, quantity: 2, address: "777 Lotus Ave, Kep", phone: "097 888 111", createdAt: "2025-08-05T00:00:00Z", status: "packaging" as OrderStatus, totalPrice: "20", isArchived: false },
    { id: 10, productId: 110, quantity: 8, address: "1 Orchid Blvd, Kratie", phone: "013 456 789", createdAt: "2025-08-03T00:00:00Z", status: "delivering" as OrderStatus, totalPrice: "80", isArchived: false },
];