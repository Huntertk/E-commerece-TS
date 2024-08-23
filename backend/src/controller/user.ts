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
        const user = await User.create({
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