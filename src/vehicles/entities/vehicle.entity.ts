import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    vehicleType:VehicleCondition

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt:Date

}