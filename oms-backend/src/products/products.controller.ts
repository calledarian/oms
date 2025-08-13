import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // GET /products
    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    // GET /products/:id
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.findOne(Number(id));
    }

    // POST /products
    @Post()
    create(@Body() data: Partial<Product>) {
        console.log('Received body:', data);

        return this.productsService.create(data);
    }


    // DELETE /products/:id
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.productsService.remove(Number(id));
    }
}
