import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  customerName!: string;

  @Column({ type: 'boolean' })
  isPremiumCustomer!: boolean;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  })
  status!: 'pending' | 'completed' | 'cancelled';

  @OneToMany(() => OrderItem, (item) => item.order)
  items!: OrderItem[];
}