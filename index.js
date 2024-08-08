import express from 'express'
import bootstrab from './src/bootstrab.js'
import cors from 'cors'
import 'dotenv/config'
import asyncHandler from './src/middleware/asyncHandler.js'
import Stripe from 'stripe'
import User from './model/user.model.js'
import Cart from './model/cart.model .js'
import Order from './model/order.model.js'
const stripe = new Stripe('sk_test_51PlFxXLs68W79KXq5qwD227XeRApbWSlkK1lE2A5WclJdYOwY2U5Dd8SV9ilvS4cry2ptLWmBvEw2ir3NhX60dg000MSdQgLT0');


const app = express()
const port = process.env.PORT ||3000

app.post('api/vi/webhook',express.raw({type:'application/json'}),asyncHandler(async(req,res)=>{
    const sig=req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body,sig,"whsec_0qaIk9bLL8VlAKvFiPM6VijsBc111p6I")
    let chechout
    if(event.type=="checkout.session.completed"){
        chechout=event.data.object
        const user=await User.findOne({email:chechout.customer_email})
        const cart=await Cart.findById(chechout.client_reference_id)
        if(!cart) next (new AppError('cart not found',404))
        //2-total order price
    const totalOrderPrice=cart.totalCartPriceAfterDiscount||cart.totalCartPrice
        //3- create order
    const order=new Order({
        user:user.id,
        orderItems:cart.cartItems,
        shippingAddress:chechout.metadata,
        totalOrderPrice:chechout.amount_total / 100,
        paymentType:'card',
        isPaid:true
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
    }
    res.json({message:"success",chechout})
}))

app.use(cors())
app.use(express.json())
// const port=3000
bootstrab(app,express)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))