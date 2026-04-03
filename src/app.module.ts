import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), AuthModule,BookingsModule,UsersModule,VehiclesModule, TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: (configService:ConfigService) =>({
      type :  'postgres',
      host : configService.get('DATABASE_HOST'),
      port : +configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: configService.get('DB_SYNCHRONIZE') ==='true',
      migrations: [__dirname + '/database/migrations/*{.ts,.js}']

    })
  })],
})
export class AppModule {}
