import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto{
    @ApiProperty({example:'benz@gmail.com'})
    @IsEmail()
    email:string

    @ApiProperty({example:'password123',minLength:8})
    @IsNotEmpty()
    password:string
}