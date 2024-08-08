
import Coupon from "../../../model/coupon.mode.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";




export const addcoupon=asyncHandler(async(req,res,next)=>{
    // const coupon=await Coupon.create(req.body)
    const couponisExist=await Coupon.findOne({code:req.body.code})
    if(couponisExist) next(new AppError('coupon Exist',409))
    const coupon=new Coupon(req.body)
    await coupon.save()
    return res.status(201).json({message:"success",coupon,status:201})
})

export const getcoupons=asyncHandler(async(req,res,next)=>{
    const coupons=await Coupon.find()
    return coupons.length==0?
    next (new AppError('coupons not found',404)):
    res.json({message:"success",coupons,status:200})
})

export const getcoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findById(req.params.id)
    coupon||next (new AppError('coupon not found',404))
    !coupon||res.json({message:"success",coupon,status:200})
})


export const updatecoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon||next (new AppError('coupon not found',404))
    !coupon||res.json({message:"success",coupon,status:200})
})

export const deletecoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findByIdAndDelete(req.params.id)
    coupon||next (new AppError('coupon not found',404))
    !coupon||res.json({message:"success",coupon,status:200})
})
