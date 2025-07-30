import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a paginated list of restaurants', () => {
    const result = service.findAll(1, 10);
    expect(result.data.length).toBe(10);
    expect(result.hasMore).toBe(true);
  });

  it('should return a paginated list of products for a given restaurant', () => {
    const restaurants = service.findAll(1, 1).data;
    const restaurantId = restaurants[0].id;
    const result = service.findProducts(restaurantId, 1, 10);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.hasMore).toBeDefined();
  });

  it('should return empty data for a non-existent restaurant', () => {
    const result = service.findProducts('non-existent-id', 1, 10);
    expect(result.data).toEqual([]);
    expect(result.hasMore).toBe(false);
  });
});
