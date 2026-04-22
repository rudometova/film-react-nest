import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/schemas/film.schema';

// DTO для одного билета
export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<Film>,
  ) {}

  async createOrder(orderItems: TicketDto[]) {
    const results = [];

    // Обрабатываем каждый билет в заказе
    for (const item of orderItems) {
      const result = await this.bookTicket(item);
      results.push(result);
    }

    return results;
  }

  private async bookTicket(item: TicketDto) {
    // 1. Находим фильм по полю id (строковый ID, не _id)
    const film = await this.filmModel.findOne({ id: item.film });
    if (!film) {
      throw new BadRequestException(`Фильм с id ${item.film} не найден`);
    }

    // 2. Находим сеанс по полю id
    const schedule = film.schedule.find(s => s.id === item.session);
    if (!schedule) {
      throw new BadRequestException(`Сеанс с id ${item.session} не найден`);
    }

    // 3. Формируем ключ места в формате "ряд:место"
    const seatKey = `${item.row}:${item.seat}`;

    // 4. Проверяем, не занято ли место
    if (schedule.taken.includes(seatKey)) {
      throw new BadRequestException(
        `Место ${item.row}:${item.seat} уже занято. Выберите другое место.`
      );
    }

    // 5. Добавляем место в занятые
    schedule.taken.push(seatKey);
    
    // 6. Сохраняем изменения в базе данных
    await film.save();

    // 7. Возвращаем подтверждение бронирования
    return {
      film: item.film,
      session: item.session,
      daytime: item.daytime,
      row: item.row,
      seat: item.seat,
      price: item.price,
      id: this.generateId(),
    };
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}