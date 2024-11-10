import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './entities/contract.entity';
import { ProductModule } from '../product/product.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { FactoryModule } from '../factory/factory.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Contract]),
    ProductModule,
    SuppliersModule,
    FactoryModule,
    WarehouseModule
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService, SequelizeModule, ProductModule, SuppliersModule, FactoryModule, WarehouseModule]
})
export class ContractModule {}
