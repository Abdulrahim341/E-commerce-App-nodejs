
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import User from "../../../model/user.model.js";



export const adduser=asyncHandler(async(req,res,next)=>{
    const user=new User(req.body)
    await user.save()
    return res.status(201).json({message:"success",user,status:201})
})

export const getusers=asyncHandler(async(req,res,next)=>{
    const users=await User.find()
    return users.length==0?
    next (new AppError('users not found',404)):
    res.status(200).json({message:"success",users,status:200})
})

export const getuser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:"success",user,status:200})
})


export const updateuser=asyncHandler(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:"success",user,status:200})
})

export const deleteuser=asyncHandler(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id)
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:"success",user,status:200})
})
