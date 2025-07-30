import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', () => {
    const createOrderDto: CreateOrderDto = {
      productIds: ['product-1', 'product-2'],
    };
    const result = service.create(createOrderDto);
    expect(result.message).toEqual('Order received successfully!');
    expect(result.order).toEqual(createOrderDto);
  });
});
