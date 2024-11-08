import { Module } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Factory } from './entities/factory.entity';

@Module({
  imports:[SequelizeModule.forFeature([Factory])],
  controllers: [FactoryController],
  providers: [FactoryService],
  exports:[FactoryService, SequelizeModule]
})
export class FactoryModule {}
