import {  Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
   constructor( 
    @InjectRepository(User)
    private usersRepository : Repository<User>
    ){}
    
    findByEmail(email:string){
        return this.usersRepository.findOne({where : {email}})
    }

    findByEmailwithPassword(email:string){
        return this.usersRepository.findOne({
            where:{email},
            select:['id','email','password','role','firstName','lastName']
        })
    }

    async create(createDto:SignupDto){
        const newUser = this.usersRepository.create(createDto)
        return this.usersRepository.save(newUser)
    }

    findAll(){
        return this.usersRepository.find()
    }

    async findOne(id:string){
        const user =await this.usersRepository.findOne({where:{id}})
        if(!user){
            throw new NotFoundException("user is not found")
        }
        return user
    }

   async update(id:string,dto:UpdateUserDto){
    const user = await this.findOne(id)
    Object.assign(user,dto)
    return this.usersRepository.save(user)
   }

    async remove(id:string){
       await this.findOne(id)
        this.usersRepository.delete(id)
        return ("User has been deleted")
    }
}
