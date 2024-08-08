import slugify from "slugify"
import asyncHandler from "../../middleware/asyncHandler.js"
import Subcategory from "../../../model/subcategory.model.js"
import AppError from "../../utils/Error.js"
import ApiFeatures from "../../utils/ApiFeatures.js"


export const addsubcategory=asyncHandler(async(req,res,next)=>{
    const {name,category}=req.body
    const slug =slugify(name)
    const subcategory=await Subcategory.create({name,slug,category})
    return res.status(201).json({message:"success",subcategory,status:201})
})

export const getsubcategories=asyncHandler(async(req,res,next)=>{
    let ApiFeature =new ApiFeatures(Subcategory.find(),req.query).pagination().sort().fields().search().filter()
    const subcategories = await ApiFeature.mongooseQuery.populate('category')
    return subcategories.length==0?
    next (new AppError('subcategories not found',404)):
    res.status(200).json({message:"success",pageNumber:ApiFeatures.page,subcategories,status:200})
})

export const getsubcategoryBymerge=asyncHandler(async(req,res,next)=>{
    const subcategories=await Subcategory.find({category:req.params.id}).populate('category')
    return subcategories.length==0?
    next (new AppError('subcategories not found',404)):
    res.status(200).json({message:"success",subcategories,status:200})
})

export const getsubcategory=asyncHandler(async(req,res,next)=>{
    const subcategory=await Subcategory.findById(req.params.id).populate('category')
    return !subcategory?
    next (new AppError('subcategorynot found',404)):
    res.status(200).json({message:"success",subcategory,status:200})
})


export const updatesubcategory=asyncHandler(async(req,res,next)=>{
    const {name,category}=req.body
    const slug =slugify(name)
    const subcategory=await Subcategory.findByIdAndUpdate(req.params.id,{name,slug,category},{new:true})
    return !subcategory?
    next (new AppError('subcategory not found',404)):
    res.status(200).json({message:"success",subcategory,status:200})
})

export const deletesubcategory=asyncHandler(async(req,res,next)=>{
    const subcategory=await Subcategory.findByIdAndDelete(req.params.id)
    return !subcategory?
    next (new AppError('subcategory not found',404)):
    res.status(200).json({message:"success",subcategory,status:200})
})
