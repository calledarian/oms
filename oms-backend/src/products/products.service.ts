import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ) { }

    findAll(): Promise<Products[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Products | null> {
        if (!id) {
            throw new Error('Missing id');
        }
        return this.productsRepository.findOneBy({ id });
    }

    async create(data: Partial<Products>): Promise<Products> {
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
