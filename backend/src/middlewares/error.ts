import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/utility-class.js';
import { ControllerType } from '../types/types.js';

export const errorMiddleware = (err:ErrorHandler, req:Request, res:Response, next:NextFunction) => {
    console.log(err);
    
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success:false,
        messgage:err.message
    })
}


export const TryCatchFunc = (func:ControllerType) => {
    return (req:Request, res:Response, next:NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch((err) => {
            next(err);
        })
    }
}