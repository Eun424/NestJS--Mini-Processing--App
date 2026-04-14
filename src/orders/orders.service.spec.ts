import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';



describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepo: Repository<Order>;
  let productRepo: Repository<Product>;
  let orderItemRepo: Repository<OrderItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,

        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepo = module.get(getRepositoryToken(Order));
    productRepo = module.get(getRepositoryToken(Product));
    orderItemRepo = module.get(getRepositoryToken(OrderItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new order', async () => {
    const createOrderDto = {
      customerName: 'John Doe',
      isPremiumCustomer: true,
      items: [],
    };

    const order = { id: 1, ...createOrderDto, items: [] };

    jest.spyOn(orderRepo, 'create').mockReturnValue(order as any);
    jest.spyOn(orderRepo, 'save').mockResolvedValue(order as any);

    jest.spyOn(service, 'findOne').mockResolvedValue(order as any);

    const result = await service.create(createOrderDto as any);

    expect(result).toEqual(order);
  });
});