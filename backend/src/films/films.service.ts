import { Injectable, Inject } from '@nestjs/common';
import { FILMS_REPOSITORY } from '../repository/repository.constants';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { Film } from '../films/entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: IFilmsRepository,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async findScheduleById(id: string): Promise<Film | null> {
    return this.filmsRepository.findScheduleById(id);
  }
}
