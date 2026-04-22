import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  
  @Post()
  createOrder(@Body() orderData: CreateOrderDto) {
    // Пока просто возвращаем то, что пришло
    // Позже добавим логику бронирования
    return {
      total: orderData.length,
      items: orderData.map(item => ({
        ...item,
        id: crypto.randomUUID()
      }))
    };
  }
}