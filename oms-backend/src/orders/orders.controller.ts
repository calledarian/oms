import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';

export class CreateOrderDto {
    address: string;
    phone: string;
    orderItems: { productId: number; quantity: number }[];
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
    findOne(@Param('id') id: number): Promise<Order | null> {
        return this.ordersService.findOne((id));
    }

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        try {
            console.log('Received order request:', dto);
            return await this.ordersService.create(dto);
        } catch (err) {
            console.error('Error creating order:', err.message);
            throw new Error('Failed to create order: ' + err.message);
        }
    }


    // DELETE /orders/:id
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.delete(Number(id));
    }
}
