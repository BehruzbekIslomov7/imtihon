import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contract } from "../../contract/entities/contract.entity";



interface ISupplierAttr{
    fullname: string;
    phone_number: string;
    address: string;
}

@Table({ tableName: "suppliers"})
export class Supplier extends Model<Supplier, ISupplierAttr>{
    @ApiProperty({
        description: "Unique identifier for the supplier",
        example: 1,
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;


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

    @HasMany(() => Contract)
    contracts: Contract[];
}
