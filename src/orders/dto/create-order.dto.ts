import { IsNotEmpty, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from '../../products/dto/create-product.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  customerName: string;

  @IsBoolean()
  isPremiumCustomer: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}