import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, DataType } from "sequelize-typescript";




export class CreateWarehouseDto {
    @ApiProperty({
        description: "Name of the warehouse",
        example: "Main warehouse",
      })
    @IsString()
    @IsNotEmpty({ message: "warehouse name is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: "Address of the warehouse",
        example: "1234 Elm St, Suite 567",
      })
    @IsString()
    @IsNotEmpty({ message: "Address is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;
    
    @ApiProperty({
        description: 'Location coordinates in the format "latitude,longitude"',
        example: "41.40338, 2.17403",
    })
    @IsString()
    @IsNotEmpty({ message: "Location is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @ApiProperty({
        description: "Description of the warehouse",
        example: "Headquarters located downtown with a large conference room",
    })
    @IsString()
    @IsOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;
}
