import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { Admin, Repository } from 'typeorm';
import { Bookings, BookingStatus } from './entities/bookings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from 'src/users/entities/user.entity';
import { Roles, ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Bookings)
        private  bookingsRepository:Repository<Bookings>,

        @InjectRepository(Vehicle)
        private vehicleRepository:Repository<Vehicle>
    ){}
    
    async create(dto:CreateBookingDto,userId:string){
        const vehicle = await this.vehicleRepository.findOne({
            where:{id:dto.vehicleId}
        })

        if(!vehicle){
            throw new NotFoundException("Vehicle does not exist")
        }

        if(!vehicle.isAvailable){
            throw new BadRequestException("Vehicle is not available for rental")
        }


        const conflict = await this.bookingsRepository
            .createQueryBuilder('booking')
            .where('booking.vehicleId = :vehicleId',{vehicleId:dto.vehicleId})
            .andWhere('booking.status IN (:...statuses)', {
                statuses:['active','pending','confirmed']
            })
            .andWhere('booking.startDate < :endDate',{endDate:dto.endDate})
            .andWhere('booking.endDate > :startDate',{startDate:dto.startDate})
            .getOne()

        if (conflict){ 
            throw new BadRequestException('Vehicle is already booked for these dates')
         }

         const activeRental = await this.bookingsRepository.findOne({
            where:{userId,status: BookingStatus.ACTIVE}
         })
        if (activeRental) {
            throw new BadRequestException('You already have an active rental. Please return it first.')
        }

        const start = new Date(dto.startDate)
        const end = new Date(dto.endDate)
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
        if (days <= 0) {
            throw new BadRequestException('End date must be after start date')
        }

        const totalPrice = days * Number(vehicle.pricePerDay)
          const booking = this.bookingsRepository.create({
        ...dto,
        userId,
        totalPrice,
        status: BookingStatus.PENDING
        })
      const savedBooking = await this.bookingsRepository.save(booking)

        vehicle.isAvailable = false
        await this.vehicleRepository.save(vehicle)

    return savedBooking
   }

   async findAll(userId:string,roles:string){

    if(roles == 'admin'){
        return this.bookingsRepository.find({
           relations:['user','vehicle']
        })
    }

    return this.bookingsRepository.find({
        where:{userId},
        relations: ['user','vehicle']
    })
   }

   async findOne(id:string,userId:string,role:string){
     const booking = await this.bookingsRepository.findOne({
        where:{id}
     })

     if(!booking){
        throw new NotFoundException('booking does not exist')
     }

     if(role !== 'admin' && booking.userId !== userId){
        throw new ForbiddenException(" not allowed to view this page")
     }
     return booking
   }

   async update(id:string,dto:UpdateBookingDto, userId:string,role:string){
        const booking = await this.findOne(id, userId, role);
        Object.assign(booking,dto)

        if (
        dto.status === BookingStatus.CANCELLED ||
        dto.status === BookingStatus.COMPLETED
        ){
        const vehicle = await this.vehicleRepository.findOne({
        where: { id: booking.vehicleId },
        });

        if (vehicle) {
        vehicle.isAvailable = true;
        await this.vehicleRepository.save(vehicle);
        }
    }
    return this.bookingsRepository.save(booking);
    }

    async remove(id:string,userId:string,role:string){
        const booking = await this.findOne(id,userId,role)
        const vehicle = await this.vehicleRepository.findOne({
            where:{id: booking.vehicleId}
        })

        if(!vehicle){
            throw new NotFoundException("Vehicle does not exist")
        }
        vehicle.isAvailable = true
        await this.bookingsRepository.remove(booking)

        return ("Booking has been deleted ")
    }
 

}
