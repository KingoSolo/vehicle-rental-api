import {  Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

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

    async create(createDto:CreateUserDto){
        const newUser = this.usersRepository.create(createDto)
        return this.usersRepository.save(newUser)
    }
}
