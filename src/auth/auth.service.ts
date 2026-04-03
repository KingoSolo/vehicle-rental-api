import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

        constructor(
            private readonly usersService:UsersService,
            private readonly jwtService:JwtService
        ){}

        async signup(dto:SignupDto){
            const existingUser = await this.usersService.findByEmail(dto.email)
            if(existingUser){
                throw new ConflictException('Email already in use')
            }
            const hashedPassword = await bcrypt.hash(dto.password,10)

            const newUser = {
                ...dto, 
                password : hashedPassword
            }
            const savedUser = await  this.usersService.create(newUser)
            return this.signToken(savedUser.id,savedUser.email,savedUser.role)
           
        }

        async login(dto:LoginDto){
            const existingUser = await this.usersService.findByEmailwithPassword(dto.email)
            if(!existingUser){
                throw new UnauthorizedException("Invalid Credentials")
            }
            const passwordCheck =await bcrypt.compare(dto.password,existingUser.password)
            if(!passwordCheck){
                throw new UnauthorizedException("Invalid Credentials")
            }
            return this.signToken(existingUser.id,existingUser.email,existingUser.role)
        }

       
        private signToken(userId:string,userEmail:string,userRole:string){
            return {
                access_token : this.jwtService.sign({sub:userId,userEmail,userRole})
            }
        }

}
