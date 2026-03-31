import { Bookings } from "../../bookings/entities/bookings.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
export enum VehicleCondition{
    USED = 'used',
    NEW  = 'new'
}

export enum VehicleType{
    CAR = 'car',
    TRUCK = 'truck',
    MOTORCYCLE = 'motorcycle',
    VAN = 'van',
    BUS = 'bus'
}

@Entity()
export class Vehicle{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    brand:string

    @Column()
    year:number

    @Column()
    color:string

    @Column()
    engineType : string

    @Column({unique:true})
    plateNumber : string 

    @Column({type:'decimal',precision:10,scale:2})
    pricePerDay:number

    @Column({default:true})
    isAvailable: boolean

    @Column({type:'enum', enum : VehicleCondition,default:VehicleCondition.NEW})
    vehicleCondition: VehicleCondition

    @Column({type:'enum', enum:VehicleType})
    vehicleType:VehicleType

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(()=>Bookings,(bookings)=>bookings.vehicle)
    bookings:Relation<Bookings[]>

}