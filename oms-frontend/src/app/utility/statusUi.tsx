import { OrderStatus } from "../interfaces/data";

export const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return 'default';
        case 'packaging':
            return 'secondary';
        case 'delivering':
            return 'primary';
        case 'complete':
            return 'success';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};
