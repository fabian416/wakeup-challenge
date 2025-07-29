import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
