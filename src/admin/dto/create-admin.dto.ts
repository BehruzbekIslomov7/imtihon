import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsEmail, Length } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Adminning ismi",
    example: "Aliyev Vali",
  })
  @IsString({ message: "To'liq ism satr bo'lishi lozim" })
  @Length(5, 50, { message: "Ism uzunligi 5 dan 50 gacha bo'lishi lozim" })
  full_name: string;

  @ApiProperty({ description: "Admin login", example: "admin123" })
  @IsString({ message: "Login satr bo'lishi lozim" })
  @Length(3, 20, { message: "Login uzunligi 3 dan 20 gacha bo'lishi lozim" })
  login: string;

  @ApiProperty({
    description: "Adminning email manzili",
    example: "admin@example.com",
  })
  @IsEmail({}, { message: "To'g'ri email manzilini kiriting" })
  email: string;

  @ApiProperty({ description: "Parol", example: "P@ssw0rd" })
  @IsString({ message: "Parol satr bo'lishi kerak" })
  @Length(8, 100, {
    message: "Parol uzunligi kamida 8 va undan ortiq belgidan iborat bo'lishi lozim",
  })
  password: string;

  @ApiProperty({ description: "Parolni tasdiqlash", example: "P@ssw0rd" })
  @IsString({ message: "Tasdiqlovchi parol satr bo'lishi lozim" })
  confirm_password: string;

  @ApiProperty({ description: "Adminning aktiv holati", default: false })
  @IsBoolean({ message: "Aktiv holat 'true' yoki 'false' bo'lishi lozim" })
  is_active?: boolean;

  @ApiProperty({
    description: "Admin yaratuvchi hisoblanadimi",
    default: false,
  })
  @IsBoolean({ message: "Yaratgan status 'true' yoki 'false' bo'lishi lozim" })
  is_creator?: boolean;
}
