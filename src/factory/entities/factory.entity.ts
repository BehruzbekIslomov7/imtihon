import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contract } from "../../contract/entities/contract.entity";


interface IFactoryAttr{
    name: string;
    address: string;
    location: string;
    description: string;
}

@Table({ tableName: "factory"})
export class Factory extends Model<Factory, IFactoryAttr> {
    @ApiProperty({
        description: "Unique identifier for the factory",
        example: 1,
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({
        description: "Name of the factory",
        example: "Main factory",
      })
    @IsString()
    @IsNotEmpty({ message: "factory name is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: "Address of the factory",
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
        description: "Description of the factory",
        example: "Headquarters located downtown with a large conference room",
    })
    @IsString()
    @IsOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @HasMany(() => Contract)
    contracts: Contract[];
}
