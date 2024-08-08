import slugify from "slugify";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import Brand from "../../../model/brand.model.js";



export const addbrand=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug =slugify(name)
    const brand=await Brand.create({name,slug})
    return res.status(201).json({message:"success",brand,status:201})
})

export const getbrands=asyncHandler(async(req,res,next)=>{
    const brands=await Brand.find()
    return brands.length==0?
    next (new AppError('brands not found',404)):
    res.status(200).json({message:"success",brands,status:200})
})

export const getbrand=asyncHandler(async(req,res,next)=>{
    const brand=await Brand.findById(req.params.id)
    return !brand?
    next (new AppError('brand not found',404)):
    res.status(200).json({message:"success",brand,status:200})
})


export const updatebrand=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug =slugify(name)
    const brand=await Brand.findByIdAndUpdate(req.params.id,{name,slug},{new:true})
    return !brand?
    next (new AppError('brand not found',404)):
    res.status(200).json({message:"success",brand,status:200})
})

export const deletebrand=asyncHandler(async(req,res,next)=>{
    const brand=await Brand.findByIdAndDelete(req.params.id)
    return !brand?
    next (new AppError('brand not found',404)):
    res.status(200).json({message:"success",brand,status:200})
})
