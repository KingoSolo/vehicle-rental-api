import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { VehicleCondition, VehicleType } from "../entities/vehicle.entity"

export class CreateVehicleDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    brand:string

    @IsString()
    @IsNotEmpty()
    color:string

    @IsString()
    @IsNotEmpty()
    engineType:string

    @IsString()
    @IsNotEmpty()
    plateNumber:string

    @IsInt()
    @Min(1990)
    @Max(2026)
    year:number

    @IsNumber()
    @Min(0)
    pricePerDay:number

    @IsEnum(VehicleCondition)
    vehicleCondition:VehicleCondition

    @IsEnum(VehicleType)
    vehicleType:VehicleType
}