import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  //CREATE ORDER //
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  //GET ALL ORDERS//
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  //GET AN ORDER //
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  //ADD ITEM TO ORDER //
  @Patch(':id/items')
  addItem(
    @Param('id') id: string,
    @Body()
    body: {
      productId: number;
      quantity: number;
    },
  ) {
    return this.ordersService.addProduct(
      +id,
      body.productId,
      body.quantity,
    );
  }

  //COMPLETE ORDER //
  @Patch(':id/complete')
  completeOrder(@Param('id') id: string) {
    return this.ordersService.completeOrder(+id);
  }

  // CANCEL ORDER //
  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(+id);
  }

  // CALCULATE TOTAL //
  @Get(':id/total')
  getTotal(@Param('id') id: string) {
    return this.ordersService.calculateOrderTotal(+id);
  }

  // FILTER EXPENSIVE ITEMS //
  @Get(':id/items/expensive')
  getExpensiveItems(
    @Param('id') id: string,
    @Query('minPrice') minPrice: string,
  ) {
    return this.ordersService.getExpensiveItems(+id, +minPrice);
  }

  // DELETE ORDER //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}