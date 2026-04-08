import { ApiProperty } from "@nestjs/swagger"
import {  IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator"

export class SignupDto{
    @ApiProperty({example:"John"})
    @IsString()
    @MinLength(2)
    firstName:string

    @ApiProperty({example:'Dan'})
    @IsString()
    @MinLength(2)
    lastName:string

    @ApiProperty({example:'benz@gmail.com'})
    @IsEmail()
    email:string

    @ApiProperty({example:'password123',minLength:8})
    @IsNotEmpty()
    password:string

    @ApiProperty({example:'080123567123'})
    @IsString()
    phoneNumber:string
}