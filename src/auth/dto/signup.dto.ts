import {  IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator"

export class SignupDto{
    @IsString()
    @MinLength(2)
    firstName:string

    @IsString()
    @MinLength(2)
    lastName:string

    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(8)
    password:string

    @IsPhoneNumber()
    phoneNumber:string
}