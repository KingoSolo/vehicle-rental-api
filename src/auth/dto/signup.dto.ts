import {  IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword, MinLength } from "class-validator"

export class SignupDto{
    @IsNotEmpty()
    @MinLength(2)
    firstName:string

    @IsNotEmpty()
    @MinLength(2)
    lastName:string

    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(8)
    password:string

    @IsPhoneNumber()
    phoneNumber:string
}