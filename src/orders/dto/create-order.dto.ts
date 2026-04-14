import { IsNotEmpty, IsBoolean} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateOrderDto {
  @IsNotEmpty()
  customerName!: string;

  @IsBoolean()
  @Type(() => Boolean)
  isPremiumCustomer!: boolean;

   items!: {
    productId: number;
    quantity: number;
  }[];
}