import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Response } from 'express';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create_admin')
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createAdminDto: CreateAdminDto, @Res({passthrough:true}) res: Response) {
    return this.adminService.create(createAdminDto, res);
  }

  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post("refreshToken/:id")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.refreshToken(id, refresh_token, res);
  }

  @Get('all_admin')
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati." })
  findAll() {
    return this.adminService.findAll();
  }

  @Get('one_admin/:id')
  @ApiOperation({ summary: "Adminni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Adminning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan admin ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('update_admin/:id')
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Adminning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('delete_admin/:id')
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiParam({
    name: "id",
    description: "Adminning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
