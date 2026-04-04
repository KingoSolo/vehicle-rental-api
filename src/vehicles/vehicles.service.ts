import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private vehiclesRepository: Repository<Vehicle>
    ){}

    async create(dto:CreateVehicleDto){
        const vehicle =   this.vehiclesRepository.create(dto)
        return await this.vehiclesRepository.save(vehicle)
    }

    findAll(){
        return this.vehiclesRepository.find()
    }

    async findone(id:string,filters:{
        vehicleType?:string,
        isAvailable?:boolean,
        maxPrice?:number
    }){
        const vehicle =await this.vehiclesRepository.findOne({where:{id}})
        const query  = this.vehiclesRepository.createQueryBuilder('vehicle')

        if(!vehicle){
            throw new NotFoundException("Vehicle not found")
        }

        if(filters.vehicleType){
            query.andWhere('vehicle.vehicleType = :type',{type:filters.vehicleType})
        }
        if (filters.isAvailable !== undefined) {
        query.andWhere('vehicle.isAvailable = :available', { available: filters.isAvailable })
        }

        if (filters.maxPrice) {
            query.andWhere('vehicle.pricePerDay <= :maxPrice', { maxPrice: filters.maxPrice })
        }

        return  query.getMany()
       
    }

    async update(id:string,dto:UpdateVehicleDto){
        const vehicleUpdated = await this.vehiclesRepository.findOne({where:{id}})
        if (!vehicleUpdated) {
            throw new Error("Vehicle not found");
        }
        Object.assign(vehicleUpdated,dto)
        return this.vehiclesRepository.save(vehicleUpdated)
    }

    async remove(id:string){
        await this.vehiclesRepository.findOne({where:{id}})
        this.vehiclesRepository.delete(id)
        return ("this vehicle was deleted")
    }

}
