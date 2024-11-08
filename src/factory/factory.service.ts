import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Factory } from './entities/factory.entity';

@Injectable()
export class FactoryService {

  constructor (@InjectModel(Factory) private factoryModel: typeof Factory){}

  create(createFactoryDto: CreateFactoryDto) {
    return this.factoryModel.create(createFactoryDto);
  }

  findAll() {
    return this.factoryModel.findAll( { include: {all: true} } );
  }

  async findOne(id: number) {
    const factory = await this.factoryModel.findByPk(id)

    if (!factory) {
      return { message: `ID: ${id} factory does not exist in the database` };
    }
    return this.factoryModel.findByPk(id, {include:{all:true}});
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto) {
    const factory = await this.factoryModel.update(updateFactoryDto, {
      where: { id },
      returning: true
    })
    return factory[1][0];
  }

  async remove(id: number) {
    const factory = await this.factoryModel.findByPk(id)

    if (!factory) {
      return { message: `ID: ${id} does not exist in the database` };
    }
    await this.factoryModel.destroy({ where: { id }})
    return { message: `ID: ${id} factory has been deleted successfully` };
  }
}
