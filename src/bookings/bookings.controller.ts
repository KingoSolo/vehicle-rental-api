import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { BookingsService } from './bookings.service';
import { UpdateBookingDto } from './dto/update-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService:BookingsService){}

    @Post()
    create(@Body() dto:CreateBookingDto,@CurrentUser() user){
        return this.bookingsService.create(dto,user.id)
    }

    @Get()
    getAll(@CurrentUser() user){
        return this.bookingsService.findAll(user.id,user.role)
    }

    @Get(':id')
    getOneBooking(@Param('id') id:string, @CurrentUser() user){
        return this.bookingsService.findOne(id,user.id,user.role)
    }

    @Patch(':id')
    updateBooking(@Param('id') id:string,@Body() dto:UpdateBookingDto,@CurrentUser() user){
        return this.bookingsService.update(id,dto,user.id,user.role)
    }

    @Delete(':id')
    deleteBooking(@Param('id') id:string,@CurrentUser() user){
        return this.bookingsService.remove(id,user.id,user.role)
    }
}
