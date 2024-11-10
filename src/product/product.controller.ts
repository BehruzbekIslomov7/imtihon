import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';


@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  @ApiOperation({ summary: "Yangi supplier qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Suppliers muvaffaqiyatli qo'shildi.",
    type: Product,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('allProduct')
  @ApiOperation({ summary: "Barcha productlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha productlar ro'yxati muvaffaqiyatli olindi."})
  findAll() {
    return this.productService.findAll();
  }

  @Get('oneProduct/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta productni olish" })
  @ApiResponse({ status: 200, description: "Product muvaffaqiyatli topildi."})
  @ApiResponse({ status: 404, description: "Product topilmadi." })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('updateProduct/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta productni yangilash" })
  @ApiResponse({ 
    status: 200,
    description: "Product muvaffaqiyatli yangilandi.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product topilmadi." })

  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('deleteProduct/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta productni o'chirish" })
  @ApiResponse({ status: 200, description: "Product muvaffaqiyatli o'chirildi."})
  @ApiResponse({ status: 404, description: "Product topilmadi." })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
