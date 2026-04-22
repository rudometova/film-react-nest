import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/schemas/film.schema';
import { IFilmsRepository } from './films.repository.interface';

@Injectable()
export class MongoFilmsRepository implements IFilmsRepository {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findScheduleById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateFilm(film: Film): Promise<Film> {
    return film.save();
  }
}