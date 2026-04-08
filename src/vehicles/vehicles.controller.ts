import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService:VehiclesService){}
    
    @ApiOperation({ summary: 'View all vehicles' })
    @Get()
    allVehicles (
    @Query('vehicleType') vehicleType?: string,
    @Query('isAvailable') isAvailable?: boolean,
    @Query('maxPrice') maxPrice?: number
) {
        return this.vehiclesService.findAll({ vehicleType, isAvailable, maxPrice })
    }

    @ApiOperation({ summary: 'Find a car' })
    @Get(':id')
    findCar(@Param() id:string){
       return  this.vehiclesService.findOne(id)
    }

    @ApiOperation({ summary: 'Register a new vehicle' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    addVehicle(@Body() dto:CreateVehicleDto){
        return this.vehiclesService.create(dto)
    }

    @ApiOperation({ summary: 'Update a vehicle info' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch(':id')
    udpateVehicle(@Param('id') id:string,@Body() dto:UpdateVehicleDto){
        return this.vehiclesService.update(id,dto)
    }

    @ApiOperation({ summary: 'Delete a  vehicle' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('id')
    remove(@Param() id:string){
        return this.vehiclesService.remove(id)
    }
}
