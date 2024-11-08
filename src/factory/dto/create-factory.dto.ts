import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateFactoryDto {
    @ApiProperty({
        description: "Name of the office",
        example: "Main Office",
    })
    @IsString()
    @IsNotEmpty({ message: "Office name is required" })
    name: string;
    
    @ApiProperty({
        description: "Address of the office",
        example: "1234 Elm St, Suite 567",
    })
    @IsString()
    @IsNotEmpty({ message: "Address is required" })
    address: string;
    
    @ApiProperty({
        description: 'Location coordinates in the format "latitude,longitude"',
        example: "41.40338, 2.17403",
    })
    @IsString()
    @IsNotEmpty({ message: "Location is required" })
    location: string;

    @ApiProperty({
        description: "Description of the office",
        example: "Headquarters located downtown with a large conference room",
    })
    @IsString()
    @IsOptional()
    description: string;
}
