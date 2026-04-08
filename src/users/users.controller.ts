import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('admin')
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @ApiOperation({summary:"View all users"})
    @Get()
    getAllUsers(){
        return this.usersService.findAll()
    }

    @ApiOperation({ summary: 'Find a user' })
    @Get(':id')
    getUserById(@Param() id:string){
        return this.usersService.findOne(id)
    }

    @ApiOperation({ summary: 'Update a user' })
    @Patch(':id')
    updateUser(@Param('id') id: string,@Body() dto:UpdateUserDto){
        return this.usersService.update(id,dto)
    }

    @ApiOperation({ summary: 'Delete a user' })
    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.usersService.remove(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user){
        return this.usersService.findOne(user.id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch('me')
    updateMe(@CurrentUser() user,@Body() dto:UpdateUserDto){
        return this.usersService.update(user.id,dto)
    }
}
