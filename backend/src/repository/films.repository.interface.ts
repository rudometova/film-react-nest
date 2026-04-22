import { Film } from '../films/schemas/film.schema';

export interface IFilmsRepository {
  findAll(): Promise<Film[]>;
  findScheduleById(id: string): Promise<Film | null>;
  updateFilm(film: Film): Promise<Film>;
}