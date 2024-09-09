import { NextFunction, Request, Response } from "express";
import { TryCatchFunc } from "../middlewares/error.js";
import { IBaseQuery, INewProductRequestBody, TypeSearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { unlink } from "fs";

export const newProduct = TryCatchFunc(
    async (req:Request<{}, {}, INewProductRequestBody>, res:Response, next:NextFunction) => {
        const {name,price,category,stock} = req.body;
        const photo = req.file;

        if(!photo){
            return next(new ErrorHandler("Please Add Photo", 400))
        }
        
        if(!name || !price || !category || !stock){
            unlink(photo.path, () => {
                console.log("While createing a product error happend the uploaded images are deleted");
                
            })
            return next(new ErrorHandler("Please provide all feilds", 400))
        }

        await Product.create({
            name,
            price,
            stock,
            category:category.toLowerCase(),
            photo:photo?.path
        })

        return res.status(201).json({
            success:true,
            message:"Product is created successfully"
        })
    }
)



export const getLatestProducts = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const products = await Product.find({}).sort({createdAt:-1}).limit(5)
        return res.status(200).json({
            success:true,
            products
        })
    }
)

export const getAllProductsCategories = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const category = await Product.distinct("category")

        return res.status(200).json({
            success:true,
            category
        })
    }
)

export const getAdminProducts = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const products = await Product.find()
        return res.status(200).json({
            success:true,
            products
        })
    }
)

export const getSingleProduct = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("The Product you looking does not exist", 404))
        }

        return res.status(200).json({
            success:true,
            product
        })
    }
)


export const updateProduct = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const {id} = req.params;
        const {name,price,category,stock} = req.body;
        const photo = req.file;

        const product = await Product.findById(id);
        if(!product){
            return next(new ErrorHandler("No product found with this id", 404))
        }

        if(photo){
            unlink(product.photo, () => {
                console.log("old image are deleted");
                
            })
            product.photo = photo.path
        }

        if(name){
            product.name = name;
        }

        if(price){
            product.price = price;
        }

        if(category){
            product.category = category;
        }

        if(stock){
            product.stock = stock;
        }

        await product.save();

        return res.status(201).json({
            success:true,
            message:"Product is updated successfully"
        })
    }
)


export const deleteProduct = TryCatchFunc(
    async (req:Request, res:Response, next:NextFunction) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("The Product you looking does not exist", 404))
        }
         
        unlink(product.photo, () => {
            console.log("image are deleted");
            
        })
        await product.deleteOne();

        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    }
)


export const getAllProducts = TryCatchFunc(
    async (req:Request<{}, {}, {}, TypeSearchRequestQuery>, res:Response, next:NextFunction) => {
        const {search, sort, category, price} = req.query;

        const page = Number(req.query.page) || 1;
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;
        const baseQuery:IBaseQuery = {}
    
        if(search){
            baseQuery.name = {
                $regex:search,
                $options:"i"
            }
        }

        if(category){
            baseQuery.category = category
        }

        if(price){
            baseQuery.price = {
                $let:Number(price)
            }
        }

        
    
        const products = await Product.find(baseQuery)
        .sort(sort && {
            price: sort ==='asc' ? 1 : -1
        })
        .limit(limit)
        .skip(skip);

        const filteredProducts = await Product.find(baseQuery);

        const totalPage = Math.ceil(filteredProducts.length / limit);

        return res.status(200).json({
            success:true,
            products,
            totalPage
        })
    }
)