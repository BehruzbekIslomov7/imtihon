import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";




export class CreateCustomerDto {
    @ApiProperty({ example: "Islom Karimov", description: "To'liq ism" })
    @IsString({ message: "To'liq ism matn ko'rinishida bo'lishi kerak" })
    @IsNotEmpty({ message: "To'liq ism bo'sh bo'lmasligi kerak" })
    full_name: string;

    @ApiProperty({ example: "login123", description: "Customer unique logini" })
    @IsString({ message: "login matn ko'rinishida bo'lishi kerak" })
    @IsNotEmpty({ message: "Login bo'sh bo'lishi mumkin emas" })
    login: string;

    @ApiProperty({ example: "+998901234567", description: "Telefon raqam" })
    @IsString({ message: "Telefon raqam matn ko'rinishida bo'lishi kerak" })
    @IsNotEmpty({ message: "Telefon raqam bo'sh bo'lmasligi kerak" })
    @Matches(/^\+998[0-9]{9}$/, {
        message:
        "Telefon raqam O'zbekiston formati bo'yicha kiritilishi kerak (+998XXXXXXXXX)",
    })
    phone_number: string;

    @ApiProperty({ example: "user@example.com", description: "Elektron pochta" })
    @IsEmail({}, { message: "Elektron pochta noto'g'ri kiritilgan" })
    @IsNotEmpty({ message: "Elektron pochta bo'sh bo'lmasligi kerak" })
    email: string;

    @ApiProperty({ example: "password123", description: "Parol" })
    @IsString({ message: "Parol matn ko'rinishida bo'lishi kerak" })
    @IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak" })
    @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" })
    password: string;

    @ApiProperty({ example: "password123", description: "Parolni tasdiqlash" })
    @IsString({ message: "Parolni tasdiqlash matn ko'rinishida bo'lishi kerak" })
    @IsNotEmpty({ message: "Parolni tasdiqlash bo'sh bo'lmasligi kerak" })
    confirm_password: string;


    
}
