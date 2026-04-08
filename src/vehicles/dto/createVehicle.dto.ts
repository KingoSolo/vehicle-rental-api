import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { VehicleCondition, VehicleType } from "../entities/vehicle.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateVehicleDto{
    @ApiProperty({example:'c100'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({example:'benz'})
    @IsString()
    @IsNotEmpty()
    brand:string

    @ApiProperty({example:'red'})
    @IsString()
    @IsNotEmpty()
    color:string

    @ApiProperty({example:'v8'})
    @IsString()
    @IsNotEmpty()
    engineType:string

    @ApiProperty({example:'lfn-124'})
    @IsString()
    @IsNotEmpty()
    plateNumber:string

    @ApiProperty({example:'2000'})
    @IsInt()
    @Min(1990)
    @Max(2026)
    year:number

    @ApiProperty({example:'30,000'})
    @IsNumber()
    @Min(0)
    pricePerDay:number

    @IsEnum(VehicleCondition)
    vehicleCondition:VehicleCondition

    @IsEnum(VehicleType)
    vehicleType:VehicleType
}