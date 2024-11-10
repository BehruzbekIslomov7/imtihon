import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import * as uuid from "uuid";


@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    private readonly mailService: MailService) { }

  async activateCustomer(link: string, res: Response) {
    try {
      const customer = await this.customerModel.findOne({
        where: { activation_link: link },
      })

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
      this.mailService.sendMailCustomer(customer);
      res.send({ message: "Foydalanuvchi faollashtirildi. Emailga xush kelibsiz." });

    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.customerModel.findAll({ include: { all: true  }});
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new BadRequestException(`${id} bunday idli foydalanuvchi topilmadi`);
    }
    return this.customerModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const activation_link = uuid.v4();
      const [updateCount, updatedCustomers] = await this.customerModel.update(
        { ...updateCustomerDto, is_active: false, activation_link }, 
        { where: { id }, returning: true });

      if (updateCount === 0) {
        throw new BadRequestException(`${id} bunday idli foydalanuvchi topilmadi`);
      }

      const updatedCustomer = updatedCustomers[0];

      try {
        await this.mailService.sendMailCustomer(updatedCustomer);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Xat yuborishda xatolik");
      }

      return { 
        message: "Muvaffaqiyatli yangilandi, Faollashtirish uchun Emailga yuborilgan linkni ustiga bosing!",
      }
    } catch (error) {
      console.log("Update Error:", error);
      throw new InternalServerErrorException('Xat yuborishda xatolik')
    }
  }

 async remove(id: number) {
  const customer = await this.customerModel.findByPk(id);

  if (!customer) {
    return { message: `ID: ${id} mavjud emas` };
  }
    return `This action removes a #${id} customer`;
  }
}
