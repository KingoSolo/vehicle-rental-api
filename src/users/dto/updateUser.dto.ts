import { PartialType } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator"
import { SignupDto } from "src/auth/dto/signup.dto";

export class UpdateUserDto extends PartialType(SignupDto){
}