import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports:[SequelizeModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports:[SuppliersService, SequelizeModule]
})
export class SuppliersModule {}
