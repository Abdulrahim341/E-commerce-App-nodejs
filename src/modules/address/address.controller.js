
import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";




export const addAddress=asyncHandler(async(req,res,next)=>{
    const address=await User.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body}},{new:true})
    address||next (new AppError('address not found',404))
    !address||res.json({message:"success",address:address.addresses,status:200})
})

export const removeAddress=asyncHandler(async(req,res,next)=>{
    const address=await User.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    address||next (new AppError('address not found',404))
    !address||res.json({message:"success",address:address.addresses,status:200})
})

export const getLoggedUserAddresses=asyncHandler(async(req,res,next)=>{
    const address=await User.findById(req.user._id)
    address||next (new AppError('address not found',404))
    !address||res.json({message:"success",address:address.addresses,status:200})
})
