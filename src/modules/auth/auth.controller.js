import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import bcyrbt from 'bcrypt'
import AppError from "../../utils/Error.js";
import jwt from 'jsonwebtoken'



export const signUp=asyncHandler(async(req,res,next)=>{
    let user =new User(req.body)
    await user.save()
    const token= jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return res.json({message:"success",token})
})


export const signIn=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(user&&bcyrbt.compareSync(req.body.password,user.password)){
        const token= jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    }
    next (new AppError('incorrect email or password',401))
})


export const changeUserPassword=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(user&&bcyrbt.compareSync(req.body.oldpassword,user.password)){
        await User.findOneAndUpdate({email:req.body.email},{password:req.body.newpassword,passwordChangedAt:Date.now()})
        const token= jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    }
    next (new AppError('incorrect email or password',401))
})

export const protectedRoutes=asyncHandler(async(req,res,next)=>{
    let{token}=req.headers
    let userPayload=null
    if(!token) return next(new AppError('token not provided',401))
        jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
    if(err) return next (new AppError(err,401))
        userPayload=payload
    })
    let user =await User.findById(userPayload.userId)
    if(!user) return next(new AppError('user not found',401))
        if(user.passwordChangedAt){
    let time=parseInt(user.passwordChangedAt.getTime()/1000)
    if(time>userPayload.iat) return next(new AppError('invalid token...login again',401))
    }
    req.user=user
next()

})


export const allowedTO=(...roles)=>{
    return asyncHandler(async(req,res,next)=>{
        if(roles.includes(req.user.role)){
            return next()
        }
        return next(new AppError('you not authorized to access this endpoint',401))
    })
}