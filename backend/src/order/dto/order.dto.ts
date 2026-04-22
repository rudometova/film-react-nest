// один билет
export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

// весь заказ
export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

// подтверждение бронирования
export class OrderResponseDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id: string;
}

// список заказов
export class OrdersResponseDto {
  total: number;
  items: OrderResponseDto[];
}