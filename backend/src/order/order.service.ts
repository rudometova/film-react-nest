import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { FILMS_REPOSITORY } from '../repository/repository.constants';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { TicketDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: IFilmsRepository,
  ) {}

  async createOrder(orderItems: TicketDto[]): Promise<OrderResponseDto[]> {
    const results: OrderResponseDto[] = [];

    for (const item of orderItems) {
      const result = await this.bookTicket(item);
      results.push(result);
    }

    return results;
  }

  private async bookTicket(item: TicketDto): Promise<OrderResponseDto> {
    const film = await this.filmsRepository.findScheduleById(item.film);
    if (!film) {
      throw new BadRequestException(`Фильм с id ${item.film} не найден`);
    }

    const schedule = film.schedule.find((s) => s.id === item.session);
    if (!schedule) {
      throw new BadRequestException(`Сеанс с id ${item.session} не найден`);
    }

    const seatKey = `${item.row}:${item.seat}`;

    // Преобразуем строку в массив (для PostgreSQL)
    const takenSeats =
      schedule.taken && schedule.taken !== '' ? schedule.taken.split(',') : [];

    if (takenSeats.includes(seatKey)) {
      throw new BadRequestException(
        `Место ${item.row}:${item.seat} уже занято. Выберите другое место.`,
      );
    }

    takenSeats.push(seatKey);
    schedule.taken = takenSeats.join(',');

    await this.filmsRepository.updateFilm(film);

    return {
      film: item.film,
      session: item.session,
      daytime: schedule.daytime,
      row: item.row,
      seat: item.seat,
      price: schedule.price,
      id: crypto.randomUUID(),
    };
  }
}
