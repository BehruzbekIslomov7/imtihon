import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from '../admin/entities/admin.entity';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Request, Response } from 'express';
import { SignInDto } from './dto/admin-signin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Customer } from '../customer/entities/customer.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('admin-signup')
  @ApiOperation({ summary: "Yangi admin qo'shish (is_creator yarata oladi)" })
  @ApiResponse({
    status: 201,
    description: "Create Admin",
    type: Admin,
  })
  async adminSignUp(@Body() createAdminDto: CreateAdminDto, @Res() res : Response){
    const result = await this.authService.adminSignUp(createAdminDto, res)
    return res.status(201).json(result)
  }

  @Post("admin-signin")
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Admin signin",
    type: Admin,
  })
  async adminSignIn(@Body() adminSignInDto:SignInDto, @Res() res: Response){
    return this.authService.adminSignIn(adminSignInDto, res);
  }


  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post("/refreshToken/:id")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refresh_token, res);
  }

  @Post("admin-signout/:id")
  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "Admin signout",
  })
  async adminSignOut(
    @Req() req: Request,
    @Res({ passthrough: true}) res: Response,
    @Param("id") id : string
  ){
    const refresh_token = req.cookies["refresh_token"]
  }

  ///////=========== customer ===========\\\\\\\\\

  @Post("customer-signup")
  @ApiOperation({ summary: "Yangi customer qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create customer",
    type: Customer,
  })
  async customerSignUp(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response
  ) {
    const result = await this.authService.customerSignUp(
      createCustomerDto,
      res
    );
    return res.status(201).json(result);
  }

  @ApiOperation({ summary: "Userni aktivlashtirish uchun link" })
  @Get("activate-customer/:link")
  activateCustomer(@Param("link") link: string, @Res() res: Response) {
    return this.authService.activateCustomer(link, res);
  }

  @Post("customer-signin")
  @ApiOperation({ summary: "customer tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "customer signin",
    type: Customer,
  })
  async customerSignIn(
    @Body() customerSignInDto: SignInDto,
    @Res() res: Response
  ) {
    return this.authService.customerSignIn(customerSignInDto, res);
  }

  @Post("customer-signout/:id")
  @ApiOperation({ summary: "customer tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "customer signout",
  })
  async customerSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string // Correct usage of decorator
  ) {
    const refreshToken = req.cookies["refresh_token"];

    return this.authService.customerSignOut(refreshToken, res, +id);
  }

}
