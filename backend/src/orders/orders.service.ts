import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    console.log('Order received:', createOrderDto);
    return { message: 'Order received successfully!', order: createOrderDto };
  }
}
