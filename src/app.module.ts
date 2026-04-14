import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { getDatabaseConfig } from './config/database.config'; 
import { OrderItemModule } from './order-item/order-item.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
      getDatabaseConfig(configService),
    }),
     OrdersModule,
    ProductsModule,
    OrderItemModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}