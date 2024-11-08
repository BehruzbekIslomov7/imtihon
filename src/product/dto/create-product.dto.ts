import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, DataType } from "sequelize-typescript";




export class CreateProductDto {
    @ApiProperty({
        description: "Name of the Product",
        example: "Product 1",
    })
    @IsString()
    @IsNotEmpty({ message: "Product name is required" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: "Description of the Product",
        example: "A high-quality product",
    })
    @IsString()
    @IsOptional()
    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @ApiProperty({
        description: "Price of the Product",
        example: 100,
    })
    @IsNotEmpty({ message: "Product price is required" })
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    price: number
    
    @ApiProperty({
        description: "Quantity in stock of the Product",
        example: 100,
    })
    @IsNotEmpty({ message: "Product quantity is required" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity_in_stock: number;

    @ApiProperty({
        description: "Category of the Product",
        example: "Electronics",
    })
    @IsString()
    @IsNotEmpty({ message: "Product category is required" })
    @Column({ 
        type: DataType.STRING,
        allowNull: false,
    })
    category: string
}

