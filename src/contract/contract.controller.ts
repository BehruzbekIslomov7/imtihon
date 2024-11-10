import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Contract")
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('createContract')
  @ApiOperation({ summary: "Yangi contract qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Contract muvaffaqiyatli qo'shildi.",
    type: CreateContractDto,
  })
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get('allContract')
  @ApiOperation({ summary: "Barcha contractlarni olish"})
  @ApiResponse({ status: 200, description: "Barcha contaractlar ro'yxatini olish"})
  findAll() {
    return this.contractService.findAll();
  }

  @Get('oneContract/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta contractni olish"})
  @ApiResponse({ status: 200, description: "Contract ma'lumotlari"})
  @ApiResponse({ status: 404, description: "Contract topilmadi." })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch('updateContract/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta contractni yangilash"})
  @ApiResponse({
    status: 200,
    description: "Contract ma'lumotlari muvaffaqiyatli yangilandi.",
    type: UpdateContractDto,
  })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete('deleteContract/:id')
  @ApiOperation({ summary: "ID bo'yicha bitta contractni o'chirish"})
  @ApiResponse({ status: 204, description: "Contract muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Contract topilmadi." })
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
