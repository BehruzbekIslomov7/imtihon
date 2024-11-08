import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IProductAttr {
    name: string;
    description: string;
    price: number
    quantity_in_stock: number;
    category: string
}


@Table({ tableName: "product" })
export class Product extends Model<Product, IProductAttr> {
    @ApiProperty({ example: "1", description: "Unikal identifikator" })
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({ example: "Aspirin", description: "To'liq nomi" })
    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({ example: "To'liq qisqicha", description: "Qisqicha tavsiya" })
    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @ApiProperty({ example: "1000", description: "Narxi" })
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,

    })
    price: number;


    @ApiProperty({ example: "100", description: "Stokningda bo'lgan miqdori" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity_in_stock: number;

    @ApiProperty({ example: "Shaxsiy", description: "Kategoriyasi" })
    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;
    







    
}
