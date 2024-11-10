import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';;
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';
import { Response } from 'express';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Customerni activlashtirish uchun link'})
  @ApiResponse({
    status: 200,
    description: "Activation linki muvaffaqiyatli yuborildi.",
    type: Customer,
  })
  @ApiResponse({ status: 404,  description: "Aktivlashtirish linki yoq"})
  @Get('activate/:link')
  activateUser(@Param("link") link: string, res: Response){
    return this.customerService.activateCustomer(link, res);
  }

  @Get('customers_all')
  @ApiOperation({ summary: "Barcha customerlarni olish" })
  @ApiResponse({ status: 200, description: " Barcha customerlarni ro'yhatini olish" })
  findAll() {
    return this.customerService.findAll();
  }

  @Get('customer_one/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta customerni olish" })
  @ApiResponse({ status: 200, description: "Customer ma'lumotlari muvaffaqiyatli olish" })
  @ApiResponse({ status: 404, description: "Customer topilmadi." })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch('customer_update/:id')
  @ApiOperation({ summary: "ID bo'yicha customerni yangilash" })
  @ApiParam({
    name: "id",
    description: "Customerning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Customer ma'lumotlari muvaffaqiyatli yangilandi.",
    type: Customer,
  })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete('customer_delete/:id')
  @ApiOperation({ summary: "ID bo'yicha customerni o'chirish" })
  @ApiResponse({ status: 200, description: "Customer muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Customer topilmadi." })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
