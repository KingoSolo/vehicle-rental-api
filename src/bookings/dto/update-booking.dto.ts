import { IsEnum, IsOptional } from "class-validator";
import { BookingStatus } from "../entities/bookings.entity";

export class UpdateBookingDto{
    @IsEnum(BookingStatus)
    @IsOptional()
    status:BookingStatus
}