import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";



export class CreateContractDto {
    @ApiProperty({ example: 1, description: "Mijozning ID raqami" })
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @ApiProperty({ example: 1, description: "Tashkilotning ID raqami" })
    @IsNotEmpty()
    @IsNumber()
    supplier_id: number;

    @ApiProperty({ example: 1, description: "Savatcha ID raqami" })
    @IsNotEmpty()
    @IsNumber()
    factory_id: number;

    @ApiProperty({ example: 1, description: "Savatcha ID raqami" })
    @IsNotEmpty()
    @IsNumber()
    warehouse_id: number;


    @ApiProperty({ example: 100, description: "Kompaniyaga qo'shilgan miqdori" })
    @IsNotEmpty()
    @IsNumber()
    total_number: number;

    @ApiProperty({ example: 10000, description: "Savatcha qo'shilgan narxi" })
    @IsNotEmpty()
    @IsNumber()
    supply_price: number;

    @ApiProperty({ example: "2022-01-01", description: "Savatcha qo'shilgan sana" })
    @IsNotEmpty()
    last_supplied_date?: Date
}
