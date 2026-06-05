import { IsString, IsEmail, IsNumber, IsArray, ValidateNested, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// один билет
export class TicketDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  daytime: string;

  @IsString()
  @IsOptional()
  day?: string;

  @IsString()
  @IsOptional()
  time?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  row: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  seat: number;

  @IsNumber()
  @Min(0)
  price: number;
}

// весь заказ
export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

// подтверждение бронирования
export class OrderResponseDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;

  @IsString()
  id: string;
}

// список заказов
export class OrdersResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderResponseDto)
  items: OrderResponseDto[];
}