import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IContractAttr {
    product_id: number;
    supplier_id: number;
    factory_id: number;
    warehouse_id: number;
    total_number: number;
    supply_price: number;
    last_supplied_date: Date
}


@Table({ tableName: "contract" })
export class Contract extends Model<Contract, IContractAttr>{
    @ApiProperty({ example: "1", description: "Unikal identifikator" })
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    
    product_id: number;
    supplier_id: number;
    factory_id: number;
    warehouse_id: number;
    total_number: number;
    supply_price: number;
    last_supplied_date: Date
}
