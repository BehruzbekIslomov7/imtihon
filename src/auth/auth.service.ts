import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/entities/admin.entity';
import { Customer } from '../customer/entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { Response } from 'express';
import { SignInDto } from './dto/admin-signin.dto';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Customer) private customerModel: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ){}

  /////=========== Admin ===========\\\\\
  async generateToken(admin: Admin){
    const payload = {
      id: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      is_admin: admin.is_admin
    }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshToken(id:number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY
      })

      if(!verified_token){
        throw new UnauthorizedException("Unauthorized token")
      }

      if(id != verified_token.id){
        throw new ForbiddenException("Forbidden user")
      }

      const payload = { id: verified_token.id , login: verified_token.login }
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      });

      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async adminSignUp(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { login: createAdminDto.login },
    });

    if (admin) {
      throw new BadRequestException("Bunday admin mavjud");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.generateToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Admin muvaffaqiyatli ro'yxatdan o'tkazildi",
      admin: updatedAdmin[1][0],
      access_token: tokens.access_token,
    };
  }

  async adminSignIn(adminSignInDto: SignInDto, res: Response) {
    const { login, password } = adminSignInDto;
    const admin = await this.adminModel.findOne({
      where: { login },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    const validPassword = await bcrypt.compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.generateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    await this.adminModel.update(
      { is_active: true, hashed_refresh_token },
      { where: { login: login } }
    );
    return res.json({
      message: "Tizimga muvaffaqiyatli kirildi",
      access_token: tokens.access_token,
    });
  }

  async adminSignOut(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminModel.findOne({
        where: { id: payload.id },
      });
      if (!admin) {
        throw new UnauthorizedException("This admin not found");
      }

      if (Number(id) !== Number(admin.id)) {
        throw new BadRequestException("Invalid id or token");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.adminModel.update(
        { hashed_refresh_token: "", is_active:false }, // Data to update
        { where: { id: payload.id } } // Options object with `where` clause
      );

      return { message: "Admin success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }

  /////========== customer =============\\\\\

  async generateTokenCustomer(customer: Customer) {
    const payload = {
      id: customer.id,
      login: customer.login,
      is_active: customer.is_active,
      is_customer: customer.is_customer,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }


  async customerSignUp(createCustomerDto: CreateCustomerDto, res: Response) {
    const customer_login = await this.customerModel.findOne({
      where: { login: createCustomerDto.login },
    });

    const customer_phone_number = await this.customerModel.findOne({
      where: { phone_number: createCustomerDto.phone_number },
    })

    const customer_email = await this.customerModel.findOne({
      where: { email: createCustomerDto.email }
    });

    if (
      customer_login ||
      customer_phone_number ||
      customer_email
    ) {
      throw new BadRequestException("Ma'lumotlar orasida ba'zi ma'lumot bilan avval ro'yxatdan o'tilgan!");
    }

    if (createCustomerDto.password !== createCustomerDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerModel.create({
      ...createCustomerDto,
      hashed_password,
    });

    const tokens = await this.generateTokenCustomer(newCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = uuid.v4();

    const updatedCustomer = await this.customerModel.update(
      { hashed_refresh_token, activation_link },
      { where: { id: newCustomer.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMailCustomer(updatedCustomer[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    const response = {
      message:
        "Customer tizimga muvaffaqiyatli qo'shildi, active bo'lish uchun emailga yuborilgan url ustiga bosing!",
      customer: updatedCustomer[1][0],
      access_token: tokens.access_token,
    };

    return response;
  }


  async activateCustomer(link: string, res: Response) {
    try {
      const customer = await this.customerModel.findOne({
        where: { activation_link: link },
      });
      if (!customer) {
        return res.status(400).send({ message: "Foydalanuvchi topilmadi!" });
      }

      if (customer.is_active) {
        return res
          .status(400)
          .send({ message: "Foydalanuvchi allaqachon faollashtirilgan." });
      }

      customer.is_active = true;
      customer.is_customer = true;
      await customer.save();

      res.send({
        is_active: customer.is_active,
        message: "Foydalanuvchi muvaffaqiyatli faollashtirildi.",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async customerSignIn(customerSignInDto: SignInDto, res: Response) {
    const { login, password } = customerSignInDto;
    const customer = await this.customerModel.findOne({
      where: { login },
    });

    if (!customer) {
      throw new UnauthorizedException("customer topilmadi");
    }

    if(!customer.is_customer){
      throw new UnauthorizedException("Foydalanuvchi customer'likka faollashtirilmagan");
    }

    const validPassword = await bcrypt.compare(
      password,
      customer.hashed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.generateTokenCustomer(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    await this.customerModel.update(
      { is_active: true, hashed_refresh_token },
      { where: { login: login } }
    );
    return res.json({
      message: "Tizimga muvaffaqiyatli kirildi",
      access_token: tokens.access_token,
    });
  }

  async customerSignOut(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const customer = await this.customerModel.findOne({
        where: { id: payload.id },
      });

      if(customer.hashed_refresh_token === ""){
        throw new UnauthorizedException("This customer already signed out");
      }
      
      if (!customer) {
        throw new UnauthorizedException("This customer not found");
      }

      if (Number(id) !== Number(customer.id)) {
        throw new BadRequestException("Invalid id or token");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        customer.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.customerModel.update(
        { hashed_refresh_token: "", is_active:false }, // Data to update
        { where: { id: payload.id } } // Options object with `where` clause
      );

      return { message: "customer success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }
}
