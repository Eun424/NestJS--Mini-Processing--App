import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';


@Entity()
export class Order {

  
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  customerName: string;

  
  @Column()
  isPremiumCustomer: boolean;

  
  @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'], default: 'pending' })
  status: 'pending' | 'completed' | 'cancelled';

  
  @OneToMany(() => Product, (product) => product.order, { cascade: true })
  products: Product[];
}