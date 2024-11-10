import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Factory } from './entities/factory.entity';

@ApiTags("Factory")
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post('createFactory')
  @ApiOperation({ summary: "Yangi factory qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Factory muvaffaqiyatli qo'shildi.",
    type: Factory,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  create(@Body() createFactoryDto: CreateFactoryDto) {
    return this.factoryService.create(createFactoryDto);
  }

  @Get('allFactory')
  @ApiOperation({ summary: "Barcha factorylarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha factorylar ro'yxati muvaffaqiyatli olindi.",
    type: [Factory],
  })
  findAll() {
    return this.factoryService.findAll();
  }

  @Get('oneFactory/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta factoryni olish" })
  @ApiResponse({
    status: 200,
    description: "Factory ma'lumotlari muvaffaqiyatli olindi.",
    type: Factory,
  })
  @ApiResponse({ status: 404, description: "Factory topilmadi." })
  findOne(@Param('id') id: string) {
    return this.factoryService.findOne(+id);
  }

  @Patch('updateFactory/:id')
  @ApiOperation({ summary: "Factory ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Factory ma'lumotlari muvaffaqiyatli yangilandi.",
    type: Factory,
  })
  @ApiResponse({ status: 400, description: "Xato so'rov." })
  @ApiResponse({ status: 404, description: "Factory topilmadi." })
  update(@Param('id') id: string, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoryService.update(+id, updateFactoryDto);
  }

  @Delete('deleteFactory/:id')
  @ApiOperation({ summary: "Factoryni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Factory muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Factory topilmadi." })
  remove(@Param('id') id: string) {
    return this.factoryService.remove(+id);
  }
}
