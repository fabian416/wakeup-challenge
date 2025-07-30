import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Restaurant } from './entities/restaurant.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class RestaurantsService {
  private readonly restaurants: Restaurant[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      const products: Product[] = [];

      const usedProductIds = new Set<string>(); // ← para evitar IDs duplicados

      for (let j = 0; j < Math.floor(Math.random() * 100) + 20; j++) {
        let id: string;

        // Genera hasta obtener un ID único dentro del restaurante
        do {
          id = faker.string.uuid();
        } while (usedProductIds.has(id));

        usedProductIds.add(id);

        products.push({
          id,
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
        });
      }

      this.restaurants.push({
        id: faker.string.uuid(),
        name: faker.company.name(),
        products,
      });
    }
  }

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = page * limit;

    const paginatedRestaurants = this.restaurants
      .slice(start, end)
      .map(({ products, ...restaurant }) => restaurant); // exclude products

    return {
      data: paginatedRestaurants,
      hasMore: end < this.restaurants.length,
    };
  }

  findProducts(id: string, page: number, limit: number) {
    const restaurant = this.restaurants.find((r) => r.id === id);
    if (!restaurant) {
      return { data: [], hasMore: false };
    }
    const start = (page - 1) * limit;
    const end = page * limit;

    const paginatedProducts = restaurant.products.slice(start, end);

    return {
      data: paginatedProducts,
      hasMore: end < restaurant.products.length,
    };
  }
}