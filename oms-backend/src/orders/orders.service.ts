import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.find({ relations: ['orderItems', 'orderItems.product'] });
    }

    findOne(id: number): Promise<Order | null> {
        if (!id) {
            throw new Error('Missing id');
        }
        return this.ordersRepository.findOne({
            where: { id },
            relations: ['orderItems', 'orderItems.product'],
        });
    }

    async create(data: { items: { productId: number; quantity: number }[] }): Promise<Order> {
        if (!data.items?.length) throw new Error('Missing order items');

        const productIds = data.items.map(i => i.productId);
        const products = await this.productsRepository.findByIds(productIds);

        let totalAmount = 0;
        const orderItems = data.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) throw new Error(`Product with ID ${item.productId} not found`);

            const price = Number(product.price);
            totalAmount += price * item.quantity;

            return {
                product,
                quantity: item.quantity,
                price, // must set price here!
            } as OrderItem;
        });

        const order = this.ordersRepository.create({
            orderItems,
            totalAmount,
        });

        return this.ordersRepository.save(order);
    }



    async remove(id: number): Promise<void> {
        if (!id) {
            throw new Error('Missing id');
        }
        await this.ordersRepository.delete(id);
    }
}
