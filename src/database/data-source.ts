import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['src/**/*.entity{.ts,.js}'],      
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
})