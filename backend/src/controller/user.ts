import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { INewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatchFunc } from "../middlewares/error.js";

export const newUser = TryCatchFunc(async (
    req:Request<{},{},INewUserRequestBody>,
    res:Response,
    next:NextFunction
) => {
        const {name, email, photo, gender, _id, dob} = req.body;

        let user = await User.findById(_id);
        if(user){
            return res.status(200).json({
                success:true,
                message:`Welcome, ${user.name}`
            })
        }
        
        if(!name || !email || !photo || !gender || !_id ||  !dob){
            return next(new ErrorHandler("Please provide all fields", 400))
        }

        user = await User.create({
            name, 
            email, 
            photo, 
            gender,  
            _id, 
            dob:new Date(dob)
        });
        return res.status(201).json({
            success:true,
            message:`Welcome, ${user.name}`
        })
});


export const getAllUsers = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const users = await User.find();
        return res.status(200).json({
            success:true,
            users
        })
    }
)

export const getUser = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return next(new ErrorHandler("No User Found", 400))
        }
        return res.status(200).json({
            success:true,
            user
        })
    }
)

export const deleteUser = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return next(new ErrorHandler("No User Found", 400))
        }

        await user.deleteOne();
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    }
)