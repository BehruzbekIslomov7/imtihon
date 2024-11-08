import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Warehouse } from './entities/warehouse.entity';

@ApiTags("Warehouse")
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post('create')
  @ApiOperation({ summary: "Yangi warehouse qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Warehouse muvaffaqiyatli qo'shildi.",
    type: Warehouse,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha warehouselarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha warehouselar ro'yxati muvaffaqiyatli olindi.",
    type: [Warehouse],
  })
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha bitta warehouseni olish" })
  @ApiResponse({
    status: 200,
    description: "Warehouse ma'lumotlari muvaffaqiyatli olindi.",
    type: Warehouse,
  })
  @ApiResponse({ status: 404, description: "Warehouse topilmadi." })
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Warehouse ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Warehouse ma'lumotlari muvaffaqiyatli yangilandi.",
    type: Warehouse,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  @ApiResponse({ status: 404, description: "Warehouse topilmadi." })
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Warehouseni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Warehouse muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Warehouse topilmadi." })
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
