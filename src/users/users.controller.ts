import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    
    @Get()
    getAllUsers(){
        return this.usersService.findAll()
    }

    @Get('id')
    getUserById(@Param() id:string){
        return this.usersService.findOne(id)
    }

    @Patch('id')
    updateUser(@Param('id') id: string,@Body() dto:UpdateUserDto){
        return this.usersService.update(id,dto)
    }

    @Delete('id')
    deleteUser(@Param() id:string){
        return this.usersService.remove(id)
    }
}
