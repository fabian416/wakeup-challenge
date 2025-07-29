import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RestaurantsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
