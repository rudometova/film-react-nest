import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    const items = await this.filmsService.findAll();
    return {
      total: items.length,
      items: items
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmsService.findScheduleById(id);
    
    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }
    
    return {
      total: film.schedule.length,
      items: film.schedule
    };
  }
}