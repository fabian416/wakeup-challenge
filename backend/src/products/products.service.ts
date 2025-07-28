import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        restaurant: faker.company.name(),
      });
    }
  }

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = page * limit;
    return this.products.slice(start, end);
  }
}
