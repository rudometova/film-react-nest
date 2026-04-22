import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrdersResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: CreateOrderDto): Promise<OrdersResponseDto> {
    const items = await this.orderService.createOrder(orderData.tickets);
    
    return {
      total: items.length,
      items: items,
    };
  }
}