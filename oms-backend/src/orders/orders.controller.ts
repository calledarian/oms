import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';

export class CreateOrderDto {
    items: { productId: number; quantity: number }[];
}

@Controller('/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // GET /orders
    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    // GET /orders/:id
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order | null> {
        return this.ordersService.findOne(Number(id));
    }

    // POST /orders
    @Post()
    create(@Body() dto: CreateOrderDto) {
        console.log('Received order request:', dto);
        return this.ordersService.create(dto);
    }

    // DELETE /orders/:id
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(Number(id));
    }
}
