import slugify from "slugify";
import asyncHandler from "../../middleware/asyncHandler.js";
import Category from "../../../model/category.model.js";
import AppError from "../../utils/Error.js";
import ApiFeatures from "../../utils/ApiFeatures.js";



export const addcategory=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug =slugify(name)
    const category=await Category.create({name,slug,image:req.file?.filename})
    return res.status(201).json({message:"success",category,status:201})
})

export const getcategories=asyncHandler(async(req,res,next)=>{
    let ApiFeature =new ApiFeatures(Category.find(),req.query).pagination().sort().fields().search()
    const categories = await ApiFeature.mongooseQuery
    return categories.length==0?
    next (new AppError('categories not found',404)):
    res.status(200).json({message:"success",categories,status:200})
})

export const getcategory=asyncHandler(async(req,res,next)=>{
    const category=await Category.findById(req.params.id)
    return !category?
    next (new AppError('category not found',404)):
    res.status(200).json({message:"success",category,status:200})
})


export const updatecategory=asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const slug =slugify(name)
    const category=await Category.findByIdAndUpdate(req.params.id,{name,slug,image:req.file?.filename},{new:true})
    return !category?
    next (new AppError('category not found',404)):
    res.status(200).json({message:"success",category,status:200})
})

export const deletecategory=asyncHandler(async(req,res,next)=>{
    const category=await Category.findByIdAndDelete(req.params.id)
    return !category?
    next (new AppError('category not found',404)):
    res.status(200).json({message:"success",category,status:200})
})
