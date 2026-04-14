import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) { }

  // CREATE ORDER //
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, ...orderData } = createOrderDto;

    const order = this.ordersRepository.create({
      ...orderData,
      status: 'pending',
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await this.productsRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      const orderItem = this.orderItemsRepository.create({
        order: savedOrder,
        product,
        quantity: item.quantity,
      });

      orderItems.push(orderItem);
    }

    await this.orderItemsRepository.save(orderItems);

    return this.findOne(savedOrder.id);
  }

  // GET ALL ORDERS //
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['items', 'items.product'],
    });
  }

  //GET AN  ORDER //
  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  // ADD ITEM TO ORDER //
  async addProduct(orderId: number, productId: number, quantity: number) {
    const order = await this.findOne(orderId);

    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const item = this.orderItemsRepository.create({
      order,
      product,
      quantity,
    });

    await this.orderItemsRepository.save(item);

    return this.findOne(orderId);
  }


  // GET EXPENSIVE ITEM //
  async getExpensiveItems(orderId: number, minPrice: number) {
    const order = await this.findOne(orderId);

    const items = order.items.filter((item) => {
      return Number(item.product.price) >= minPrice;
    });

    return {
      orderId,
      minPrice,
      count: items.length,
      items,
    };
  }

  // TOTAL CALCULATION //
  async calculateOrderTotal(id: number): Promise<number> {
    const order = await this.findOne(id);

    if (order.status === 'cancelled') return 0;

    let total = order.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);
    if (order.isPremiumCustomer) {
      total *= 0.9;
    }

    if (total > 3000) {
      total *= 0.95;
    }

    return total;
  }

  // COMPLETE ORDER //
  async completeOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status !== 'pending') {
      throw new NotFoundException('Order already processed');
    }

    order.status = 'completed';
    return this.ordersRepository.save(order);
  }

  // CANCEL ORDER //
  async cancelOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === 'completed') {
      throw new NotFoundException('Cannot cancel completed order');
    }

    order.status = 'cancelled';
    return this.ordersRepository.save(order);
  }

  // DELETE ORDER //
  async remove(id: number) {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);

    return { message: `Order ${id} deleted` };
  }
}