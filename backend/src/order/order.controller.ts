import { Controller, Post, Body } from '@nestjs/common';

@Controller('order')  
export class OrderController {
  
  @Post()
  createOrder(@Body() orderData: any) {
    return { message: 'Заказ будет создан здесь', data: orderData };
  }
}