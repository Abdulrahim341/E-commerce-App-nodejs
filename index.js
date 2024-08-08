import express from 'express'
import bootstrab from './src/bootstrab.js'
import cors from 'cors'
import 'dotenv/config'
import asyncHandler from './src/middleware/asyncHandler.js'
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51PlFxXLs68W79KXq5qwD227XeRApbWSlkK1lE2A5WclJdYOwY2U5Dd8SV9ilvS4cry2ptLWmBvEw2ir3NhX60dg000MSdQgLT0');


const app = express()
const port = process.env.PORT ||3000

app.post('api/vi/webhook',express.raw({type:'application/json'}),asyncHandler((req,res)=>{
    const sig=req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body,sig,"whsec_0qaIk9bLL8VlAKvFiPM6VijsBc111p6I")
    let chechout
    if(event.type=="checkout.session.completed"){
        chechout=event.data.object
    }
    res.json({message:"success",chechout})
}))
app.use(cors())
// const port=3000
bootstrab(app,express)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))