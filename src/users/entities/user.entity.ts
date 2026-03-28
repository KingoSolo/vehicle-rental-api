import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum UserRole{
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName : string

    @Column()
    lastName : string

    @Column({unique:true})
    email : string

    @Column()
    phoneNumber : string

    @Column({select:false})
    password : string

    @Column({type:'enum',enum:UserRole,default:UserRole.USER})
    role : UserRole

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    bookings: any
   

}