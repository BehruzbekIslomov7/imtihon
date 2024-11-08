import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Column, DataType } from "sequelize-typescript";



export class CreateSupplierDto {
    @ApiProperty({
        description: "Name of the Supplier",
        example: "Main Supplier",
      })
    @IsString()
    @IsNotEmpty({ message: "Supplier name is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullname: string;

    @ApiProperty({
        description: "Contact phone number of the supplier",
        example: "+1234567890",
    })
    @IsPhoneNumber(null, { message: "Phone number must be a valid format" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    phone_number: string;
}
