import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ICustomerAttr {
    full_name: string;
    login: string;
    phone_number: string;
    email: string;
    hashed_password: string;
    is_active: boolean;
    hashed_refresh_token: string;
}

@Table({ tableName: "customer" })
export class Customer extends Model<Customer, ICustomerAttr> {
    @ApiProperty({ example: "1", description: "Unikal identifikator" })
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({ example: "Islomov Karimjon", description: "To'liq ismi" })
    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @ApiProperty({
        example: "customer1",
        description: "Customer uchun unique login",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    login: string;

    @ApiProperty({ example: "+998901234455", description: "Telefon raqam" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    phone_number: string;

    @ApiProperty({ example: "user@gmail.com", description: "Elektron pochta" })
    @IsEmail()
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @ApiProperty({ example: "hashedPassword123", description: "Hashed parol" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @ApiProperty({ example: true, description: "Aktivlik holati" })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_active: boolean;

    @ApiProperty({ example: true, description: "Mijozligi haqida" })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_customer: boolean;

    @ApiProperty({
        example: "hashedRefreshToken123",
        description: "Hashed yangilash tokeni",
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    activation_link: string;

    
}
