import { Controller, Get, Param } from '@nestjs/common';

@Controller('films')  
export class FilmsController {
  
  @Get()
  getAllFilms() {
    return { message: 'Список фильмов будет здесь' };
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return { message: `Расписание фильма с id ${id} будет здесь` };
  }
}