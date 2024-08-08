
import Cart from "../../../model/cart.model .js";
// import Coupon from "../../../model/coupon.mode.js";
import Order from "../../../model/order.model.js";
import Product from "../../../model/product.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PlFxXLs68W79KXq5qwD227XeRApbWSlkK1lE2A5WclJdYOwY2U5Dd8SV9ilvS4cry2ptLWmBvEw2ir3NhX60dg000MSdQgLT0');


export const createCashOrder=asyncHandler(async(req,res,next)=>{
    //1-get user cart bycartId
    const cart=await Cart.findById(req.params.id)
    if(!cart) next (new AppError('cart not found',404))
    //2-total order price
const totalOrderPrice=cart.totalCartPriceAfterDiscount||cart.totalCartPrice
    //3- create order
const order=new Order({
    user:req.user.id,
    orderItems:cart.cartItems,
    shippingAddress:req.body.shippingAddress,
    totalOrderPrice
})    
await order.save()

// 4- increment sold& decrement stock
const options= cart.cartItems.map((prod)=>{
    return(
        {
            updateOne:{
                "filter":{_id:prod.product},
                "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
            }
        }
    )
})  
await Product.bulkWrite(options)
    //5- clear user cart
    await Cart.findByIdAndDelete(cart._id)
res.json({message:'success',order})
})

export const getUserOrders=asyncHandler(async(req,res,next)=>{
    const orders=await Order.findOne({user:req.user.id}).populate('orderItems.product')
    return res.json({message:'success',orders})
})

export const getAllOrders=asyncHandler(async(req,res,next)=>{
    const orders=await Order.find({})
    return res.json({message:'success',orders})
})


export const createCheckoutSession=asyncHandler(async(req,res,next)=>{
    const cart=await Cart.findById(req.params.id)
    if(!cart) next (new AppError('cart not found',404))
    const totalOrderPrice=cart.totalCartPriceAfterDiscount||cart.totalCartPrice
const session=await stripe.checkout.sessions.create({
    line_items:[
        {
            price_data:{
                currency:'egp',
                unit_amount:totalOrderPrice*100,
                product_data:{
                    name:req.user.name
                }
            },
            quantity:1,
        }
    ],
    mode:'payment',
    success_url:"https://hambozoo.netlify.app/#/orders",
    cancel_url:"https://hambozoo.netlify.app/#/cart",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress,
})
res.json({message:"success",session})
})