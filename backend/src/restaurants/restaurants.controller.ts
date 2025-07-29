import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    console.log('Received query for restaurants:', query);
    return this.restaurantsService.findAll(query.page ?? 1, query.limit ?? 10);
  }

  @Get(':id/products')
  findProducts(@Param('id') id: string, @Query() query: PaginationDto) {
    return this.restaurantsService.findProducts(id, query.page ?? 1, query.limit ?? 10);
  }
}
