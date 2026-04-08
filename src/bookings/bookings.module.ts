import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from './entities/bookings.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
    imports : [TypeOrmModule.forFeature([Bookings]),VehiclesModule],
    controllers:[BookingsController],
    providers:[BookingsService],
    exports:[TypeOrmModule]
})

export class BookingsModule {}