import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('signup')
    signUp(@Body() dto:SignupDto){
        return this.authService.signup(dto)
    }

    @Post('login')
    logIn(@Body() dto:LoginDto){
        return this.authService.login(dto)
    }
}
