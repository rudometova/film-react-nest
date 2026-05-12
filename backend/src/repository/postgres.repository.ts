import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { IFilmsRepository } from './films.repository.interface';

@Injectable()
export class PostgresFilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findScheduleById(id: string): Promise<Film | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (film && film.schedule) {
      // Сортируем сеансы по дате и времени
      film.schedule.sort((a, b) => {
        return new Date(a.daytime).getTime() - new Date(b.daytime).getTime();
      });
    }

    return film;
  }

  async updateFilm(film: Film): Promise<Film> {
    // Сохраняем изменения в расписании отдельно
    for (const schedule of film.schedule) {
      const existingSchedule = await this.scheduleRepository.findOne({
        where: { id: schedule.id },
      });

      if (existingSchedule && existingSchedule.taken !== schedule.taken) {
        await this.scheduleRepository.save(schedule);
      }
    }

    return film;
  }
}
