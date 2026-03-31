import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation} from "typeorm";
export enum BookingStatus{
    ACTIVE = 'active',
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

@Entity()
export class Bookings{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:'date'})
    startDate : Date

    @Column({type:'date'})
    endDate : Date

    @Column({type:"decimal",precision:10,scale:2})
    totalPrice : number

    @Column({type:"enum",enum:BookingStatus,default:BookingStatus.PENDING})
    status : BookingStatus

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @ManyToOne(()=>User, (user) => user.bookings)
    user: Relation<User>

    @Column()
    userId:string

    @ManyToOne(()=>Vehicle,(vehicle)=>vehicle.bookings)
    vehicle : Relation<Vehicle>

    @Column()
    vehicleId:string

}