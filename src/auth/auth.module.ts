import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/entities/admin.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[
    SequelizeModule.forFeature([Admin, Customer]),
    JwtModule.register({}),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
