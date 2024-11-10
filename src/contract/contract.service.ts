import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/entities/product.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Contract } from './entities/contract.entity';
import { Factory } from '../factory/entities/factory.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';

@Injectable()
export class ContractService {


  constructor(
    @InjectModel(Contract) private readonly contractModel: typeof Contract,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Supplier) private readonly supplierModel: typeof Supplier,
    @InjectModel(Factory) private readonly factoryModel: typeof Factory,
    @InjectModel(Warehouse) private readonly warehouseModel: typeof Warehouse
  ) {}

  async create(createContractDto: CreateContractDto) {

    const product = await this.productModel.findByPk(createContractDto.product_id);
    const supplier = await this.supplierModel.findByPk(createContractDto.supplier_id);
    const factory = await this.factoryModel.findByPk(createContractDto.factory_id);
    const warehouse = await this.warehouseModel.findByPk(createContractDto.warehouse_id);

    if (!product || !supplier || !factory || !warehouse) {
      throw new Error('Barcha elementlar bazadan o`tmagan');
    }

    const existingContract = await this.contractModel.findOne({
      where: {
          product_id: createContractDto.product_id,
          supplier_id: createContractDto.supplier_id,
          factory_id: createContractDto.factory_id,
          warehouse_id: createContractDto.warehouse_id,
      },
  });

  if (existingContract) {
      throw new NotFoundException('Bu product_id, supplier_id, factory_id va warehouse_id qiymatlari bilan contract allaqachon mavjud');
  }

    return this.contractModel.create(createContractDto);
  }

  findAll() {
    return this.contractModel.findAll({ include: {all : true}});
  }

  async findOne(id: number) {
    const contract = await this.contractModel.findByPk(id, {include: { all: true}})

    if (!contract) {
      throw new NotFoundException(`ID: ${id} contract mavjud emas!`);
    }
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract =  await this.contractModel.findByPk(id);

    if (!contract) {
      throw new NotFoundException(`ID: ${id} contract mavjud emas!`);
    }

    return this.contractModel.update(updateContractDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const contract = await this.contractModel.findByPk(id);

    if (!contract) {
      throw new NotFoundException(`ID: ${id} contract mavjud emas!`);
    }
    await contract.destroy();
    return contract;
  }
}
