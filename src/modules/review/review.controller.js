
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import Review from "../../../model/review.model.js";
import User from "../../../model/user.model.js";




export const addreview=asyncHandler(async(req,res,next)=>{
    req.body.user=req.user._id
    const userisExist=await Review.findOne({user:req.user._id,product:req.body.product})
    if(userisExist) return next(new AppError('you permitted to create one review',409))
    const review=await Review.create(req.body)
    return res.status(201).json({message:"success",review,status:201})
})

export const getreviews=asyncHandler(async(req,res,next)=>{
    const reviews=await Review.find()
    return reviews.length==0?
    next (new AppError('reviews not found',404)):
    res.status(200).json({message:"success",reviews,status:200})
})

export const getreview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findById(req.params.id)
    return !review?
    next (new AppError('review not found',404)):
    res.status(200).json({message:"success",review,status:200})
})


export const updatereview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    return !review?
    next (new AppError('review not found or you are not created review ',404)):
    res.status(200).json({message:"success",review,status:200})
})

export const deletereview=asyncHandler(async(req,res,next)=>{
    const review=await Review.findOneAndDelete({_id:req.params.id,user:req.user._id})
    return !review?
    next (new AppError('review not found or you are not created review ',404)):
    res.status(200).json({message:"success",review,status:200})
})
