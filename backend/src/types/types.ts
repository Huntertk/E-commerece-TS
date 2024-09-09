import { NextFunction, Request, Response } from "express";

export interface INewUserRequestBody{
    name:string;
    email:string;
    photo:string;
    gender:string;
    _id:string;
    dob:Date;

} 

export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>


export interface INewProductRequestBody{
    name:string;
    category:string;
    price:number;
    stock:number;
}

export type TypeSearchRequestQuery = {
    search?:string;
    price?:string;
    category?:string;
    sort?:string;
    page?:string;
    
}


export interface IBaseQuery {
    name?:{
        $regex:string;
        $options:string;
    };
    price?: {
        $let: number;
    };
    category?: string;
}