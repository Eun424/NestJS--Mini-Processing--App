import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity({ name: 'product' }) // explicit table name
export class Product {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

 
}