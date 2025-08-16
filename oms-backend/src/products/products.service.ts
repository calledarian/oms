import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/order-item.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        if (!id) throw new Error('Missing id');

        const product = await this.productsRepository.findOneBy({ id });
        if (!product) throw new BadRequestException('Product not found');

        return product;
    }


    async create(data: Partial<Product>): Promise<Product> {
        if (!data.name || !data.description || !data.price) {
            throw new Error('Missing required fields: name, description, price');
        }
        const product = this.productsRepository.create(data);
        return this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        if (!id) {
            throw new Error('Missing id');
        }
        const count = await this.orderItemRepository.count({
            where: { product: { id } },
        });
        if (count > 0) {
            throw new BadRequestException(
                'Cannot delete product: it has existing order items.',
            );
        }
        await this.productsRepository.delete(id);

    }
}
