import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        const {method,originalUrl} = req
        const timestamp = new Date().toISOString()

        res.on('finish', () => {
            console.log(`[${timestamp}] ${method} ${originalUrl} → ${res.statusCode}`)
        })

        next() 
    }

}