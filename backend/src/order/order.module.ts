import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { PostgresFilmsRepository } from '../repository/postgres.repository';
import { FILMS_REPOSITORY } from '../repository/repository.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useClass: PostgresFilmsRepository,
    },
  ],
})
export class OrderModule {}
