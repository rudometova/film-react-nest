import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { PostgresFilmsRepository } from '../repository/postgres.repository';
import { FILMS_REPOSITORY } from '../repository/repository.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMS_REPOSITORY,
      useClass: PostgresFilmsRepository,
    },
  ],
})
export class FilmsModule {}
