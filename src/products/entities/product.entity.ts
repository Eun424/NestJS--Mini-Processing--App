import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';


@Entity()
export class Product {

  
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  name: string;

  
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  
  @Column()
  quantity: number;

  
  @ManyToOne(() => Order, (order) => order.products, { onDelete: 'CASCADE' })
  order: Order;
}