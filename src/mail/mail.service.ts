import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Customer } from "../customer/entities/customer.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailCustomer(customer:Customer){
    const url = `${process.env.API_URL}:${process.env.PORT}/api/auth/activate-customer/${customer.activation_link}`;
    await this.mailerService.sendMail({
      to: customer.email,
      subject: "Warehouse ga xush kelibsiz",
      template: "./confirm",
      context: {
        full_name: customer.full_name,
        url,
      },
    });
  }
}
