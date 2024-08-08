
import Cart from "../../../model/cart.model .js";
import Coupon from "../../../model/coupon.mode.js";
import Product from "../../../model/product.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";


function calcTotalPrice(cart){
    cart.totalCartPrice=cart.cartItems.reduce((prev,item) => prev += item.quantity*item.price,0)
if(cart.discount){
    cart.totalCartPriceAfterDiscount=
    cart.totalCartPrice - (cart.totalCartPrice * Coupon.discount)/100}
}

export const addToCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOne({user:req.user._id})
    const product=await Product.findById(req.body.product)
    if(!product) return next(new AppError('product not found',404))
    req.body.price=product.price
if(req.body.quantity>product.stock) return next(new AppError('sold out',404))
    if(!cart){
        const cart=new Cart({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:'success',cart})
    }else{
        const item=cart.cartItems.find(item=>item.product==req.body.product)
        if(item) {
            item.quantity += req.body.quantity||1
        if(item.quantity>product.stock) return next(new AppError('sold out',404))
        }
        if(!item) cart.cartItems.push(req.body)
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:'success',cart})
    }
})

export const updateQuantity=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOne({user:req.user._id})
    const item=cart.cartItems.find(item=>item.product==req.params.id)
    if(!item)return next(new AppError('product not found',404))
        item.quantity=req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
        res.json({message:"success",cart,status:200})
    
})

export const removeFromCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOneAndDelete({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
    await cart.save()
    cart||next (new AppError('cart not found',404))
    !cart||res.json({message:"success",cart,status:200})
})

export const getloggedUserCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOne({user:req.user._id})
    cart||next (new AppError('cart not found',404))
    !cart||res.json({message:"success",cart,status:200})
})

export const clearUserCart=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findOneAndDelete({user:req.user._id})
    cart||next (new AppError('cart not found',404))
    !cart||res.json({message:"success",cart,status:200})
})

export const applyCoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}})
    if(!coupon)return next(new AppError('opps coupon invalid',404))
        const cart=await Cart.findOne({user:req.user._id})
    cart.discount=coupon.discount
    await cart.save()
    res.json({message:'success',cart})
})