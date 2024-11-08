import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {

  constructor (@InjectModel(Supplier) private supplierModel: typeof Supplier){}


  create(createSupplierDto: CreateSupplierDto) {
    return this.supplierModel.create(createSupplierDto);
  }

  findAll() {
    return this.supplierModel.findAll({ include: {all: true}});
  }

  async findOne(id: number) {
    const supplier = await this.supplierModel.findByPk(id);

    if (!supplier) {
      return { message: `ID: ${id} supplier does not exist in the database` };
    }
    return this.supplierModel.findByPk(id, {include:{all:true}});
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierModel.update(updateSupplierDto, {
      where: { id },
      returning: true
    })
    return supplier[1][0];
  }

  async remove(id: number) {
    const supplier = await this.supplierModel.findByPk(id)

    if (!supplier) {
      return { message: `ID: ${id} does not exist in the database` };
    }
    await this.supplierModel.destroy({ where: { id }})
    return { message: `ID: ${id} supplier has been deleted successfully` };
  }
}
