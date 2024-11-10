import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/entities/product.entity";
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { Factory } from "../../factory/entities/factory.entity";
import { Warehouse } from "../../warehouse/entities/warehouse.entity";


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

    @ApiProperty({ example: 1, description: "Mijozning ID raqami" })
    @ForeignKey(() => Product)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    product_id: number;
    @BelongsTo(() => Product)
    product: Product;

    @ApiProperty({ example: 1, description: "Tashkilotning ID raqami" })
    @ForeignKey(() => Supplier)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    supplier_id: number;
    @BelongsTo(() => Supplier)
    supplier: Supplier;

    @ApiProperty({ example: 1, description: "Savatcha ID raqami" })
    @ForeignKey(() => Factory)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    factory_id: number;
    @BelongsTo(() => Factory)
    factory: Factory;

    @ApiProperty({ example: 1, description: "Savatcha ID raqami" })
    @ForeignKey(() => Warehouse)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    warehouse_id: number;
    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;


    @ApiProperty({ example: 100, description: "Kompaniyaga qo'shilgan miqdori" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    total_number: number;

    @ApiProperty({ example: 10000, description: "Savatcha qo'shilgan narxi" })
    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    supply_price: number;

    @ApiProperty({ example: "2022-01-01", description: "Savatcha qo'shilgan sana" })
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    last_supplied_date?: Date
}
