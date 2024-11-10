import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Supplier } from './entities/supplier.entity';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('createSupplier')
  @ApiOperation({ summary: "Yangi supplier qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Suppliers muvaffaqiyatli qo'shildi.",
    type: Supplier,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get('allSupplier')
  @ApiOperation({ summary: "Barcha supplierlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha supplierlar ro'yxati muvaffaqiyatli olindi.",
    type: [Supplier],
  })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get('oneSupplier/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta supplierni olish" })
  @ApiResponse({
    status: 200,
    description: "supplier ma'lumotlari muvaffaqiyatli olindi.",
    type: Supplier,
  })
  @ApiResponse({ status: 404, description: "supplier topilmadi." })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch('allSupplier/:id')
  @ApiOperation({ summary: "supplier ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "supplier ma'lumotlari muvaffaqiyatli yangilandi.",
    type: Supplier,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  @ApiResponse({ status: 404, description: "supplier topilmadi." })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete('deleteSupplier/:id')
  @ApiOperation({ summary: "supplierni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "supplier muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "supplier topilmadi." })
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
