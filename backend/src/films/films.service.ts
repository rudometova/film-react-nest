import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<Film>,
  ) {}

  // Получить все фильмы
  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  // Получить фильм по ID с расписанием
  async findScheduleById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }
}