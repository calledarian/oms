import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number; // subtotal for this item

    // Relation to Order
    @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    orderId: number;

    // Relation to Product
    @ManyToOne(() => Product, product => product.orderItems)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: number;
}
