import { mongoose,  model, Schema, Types } from "mongoose";
const schema=new Schema({
user:{
    type:Types.ObjectId,
    ref:'user'
},
orderItems:[
    {
    product:{
        type:Types.ObjectId,
        ref:'Product'
    },
    quantity:Number,
    price:Number,
    }
],
totalOrderPrice:Number,
shippingAddress:{
    city:String,
    street:String,
    phoneNo:String
},
paymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
},
isPaid:{
    type:Boolean,
    default:false
},
deliveredAt:Date
},{
    timestamps:true,
    versionKey:false
})
const Order=model('Order',schema)
export default Order