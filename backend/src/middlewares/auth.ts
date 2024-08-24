import { NextFunction, Request, Response } from "express";
import { TryCatchFunc } from "./error.js";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";

//Middleware to verify admin
export const adminOnly = TryCatchFunc(
    async(req:Request, res:Response, next:NextFunction) => {
        const {id} = req.query;

        if(!id){
            return next(new ErrorHandler("Please login", 401))
        }
        const user = await User.findById(id);
        if(!user){
            return next(new ErrorHandler("User not available with this ID", 401))
        } 
        if(user.role !== 'admin'){
            return next(new ErrorHandler("you are not allowed to complete this request contact to admin", 401))
        }

        return next();
    }
)