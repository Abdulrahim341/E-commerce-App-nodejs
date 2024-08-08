
import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";




export const addToWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist||next (new AppError('wishlist not found',404))
    !wishlist||res.json({message:"success",wishlist:wishlist.wishlist,status:200})
})

export const removeFROMWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist||next (new AppError('wishlist not found',404))
    !wishlist||res.json({message:"success",wishlist:wishlist.wishlist,status:200})
})

export const getLoggedUserWishlist=asyncHandler(async(req,res,next)=>{
    const wishlist=await User.findById(req.user._id).populate('wishlist')
    wishlist||next (new AppError('wishlist not found',404))
    !wishlist||res.json({message:"success",wishlist:wishlist.wishlist,status:200})
})
