import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { INewUserRequestBody } from "../types/types.js";

export const newUser = async (
    req:Request<{},{},INewUserRequestBody>,
    res:Response,
    next:NextFunction
) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:`Error, ${error}`
        })
    }
}