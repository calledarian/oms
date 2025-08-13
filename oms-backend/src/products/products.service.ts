import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product | null> {
        if (!id) {
            throw new Error('Missing id');
        }
        return this.productsRepository.findOneBy({ id });
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
        await this.productsRepository.delete(id);
    }
}
