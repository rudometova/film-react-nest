import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilms = [
    { id: '1', title: 'Film 1', rating: 8.5 },
    { id: '2', title: 'Film 2', rating: 9.0 },
  ];

  const mockSchedule = {
    schedule: [
      { id: 's1', daytime: '2026-06-10T10:00:00Z', hall: 1 },
    ],
  };

  const mockFilmsService = {
    findAll: jest.fn().mockResolvedValue(mockFilms),
    findScheduleById: jest.fn().mockImplementation((id: string) => {
      if (id === '1') return Promise.resolve(mockSchedule);
      return Promise.resolve(null);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return all films', async () => {
      const result = await controller.getAllFilms();
      expect(result).toEqual({ total: 2, items: mockFilms });
      expect(filmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getFilmSchedule', () => {
    it('should return schedule for existing film', async () => {
      const result = await controller.getFilmSchedule('1');
      expect(result).toEqual({ total: 1, items: mockSchedule.schedule });
      expect(filmsService.findScheduleById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException for non-existing film', async () => {
      await expect(controller.getFilmSchedule('999')).rejects.toThrow(
        new NotFoundException('Фильм с id 999 не найден'),
      );
    });
  });
});