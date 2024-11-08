import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {

  constructor (@InjectModel(Warehouse) private wareModel: typeof Warehouse){}

  create(createWarehouseDto: CreateWarehouseDto) {
    return this.wareModel.create(createWarehouseDto);
  }

  findAll() {
    return this.wareModel.findAll( { include: {all: true} } );
  }

  async findOne(id: number) {
    const warehouse = await this.wareModel.findByPk(id)

    if (!warehouse) {
      return { message: `ID: ${id} warehouse does not exist in the database` };
    }
    return this.wareModel.findByPk(id, {include:{all:true}});
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    const warehouse = await this.wareModel.update(updateWarehouseDto, {
      where: { id },
      returning: true
    })
    return warehouse[1][0];
  }

  async remove(id: number) {
    const warehouse = await this.wareModel.findByPk(id)

    if (!warehouse) {
      return { message: `ID: ${id} does not exist in the database` };
    }
    await this.wareModel.destroy({ where: { id }})
    return { message: `ID: ${id} factory has been deleted successfully` }
  }
}
