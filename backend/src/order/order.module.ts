import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { MongoFilmsRepository } from '../repository/mongo.repository';
import { FILMS_REPOSITORY } from '../repository/repository.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useClass: MongoFilmsRepository,
    },
  ],
})
export class OrderModule {}