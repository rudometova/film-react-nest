// DTO для одного билета
export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

// DTO для всего заказа
export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}