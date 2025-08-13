// src/orders/order-item.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    // Price of the product at the time the order was placed
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    // Relation to Order. An OrderItem belongs to one Order.
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    // Relation to Product. An OrderItem refers to one Product.
    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product;
}