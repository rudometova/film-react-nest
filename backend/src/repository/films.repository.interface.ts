import { Film } from '../films/entities/film.entity';

export interface IFilmsRepository {
  findAll(): Promise<Film[]>;
  findScheduleById(id: string): Promise<Film | null>;
  updateFilm(film: Film): Promise<Film>;
}
