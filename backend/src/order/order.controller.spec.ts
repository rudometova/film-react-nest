import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, OrdersResponseDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderResult = [
    {
      id: 't1',
      film: '1',
      session: 's1',
      daytime: '2026-06-10T10:00:00Z',
      row: 3,
      seat: 5,
      price: 350,
    },
  ];

  const mockOrderService = {
    createOrder: jest.fn().mockResolvedValue(mockOrderResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create order and return response', async () => {
      const dto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+79999999999',
        tickets: [
          {
            film: '1',
            session: 's1',
            daytime: '2026-06-10T10:00:00Z',
            row: 3,
            seat: 5,
            price: 350,
          },
        ],
      };

      const expectedResponse: OrdersResponseDto = {
        total: 1,
        items: mockOrderResult,
      };

      const result = await controller.createOrder(dto);
      expect(result).toEqual(expectedResponse);
      expect(orderService.createOrder).toHaveBeenCalledWith(dto.tickets);
    });
  });
});