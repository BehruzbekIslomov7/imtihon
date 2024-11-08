import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FactoryModule } from './factory/factory.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CustomerModule } from './customer/customer.module';
import { ContractModule } from './contract/contract.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    AuthModule,
    FactoryModule,
    WarehouseModule,
    SuppliersModule,
    CustomerModule,
    ContractModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
