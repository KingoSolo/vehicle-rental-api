import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

UseGuards(JwtAuthGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @ApiOperation({ summary: 'Register a new user' })
    @Post('signup')
    signUp(@Body() dto:SignupDto){
        return this.authService.signup(dto)
    }

    @ApiOperation({ summary: 'Login and get access token' })
    @Post('login')
    logIn(@Body() dto:LoginDto){
        return this.authService.login(dto)
    }
}
