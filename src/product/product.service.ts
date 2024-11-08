import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private  productModul: typeof Product){}

  
  create(createProductDto: CreateProductDto) {
    return this.productModul.create(createProductDto);
  }

  findAll() {
    return this.productModul.findAll( {include: {all: true}})
  }

  async findOne(id: number) {
    const product = await this.productModul.findByPk(id);
    
    if(!product){
      return {message: `ID: ${id} product does not exist in the database`};
    }
    return this.productModul.findByPk(id, { include: { all: true}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModul.update(updateProductDto, {where: {id}, returning: true});

    return product;
  }

  async remove(id: number) {
    const product = await this.productModul.findByPk(id);

    if (!product){
      return {message: `ID: ${id} product does not exist in the database`};
    }
    await this.productModul.destroy({ where: { id } });
    return {message: `ID: ${id} product does not exist in the database`};
  }
}
