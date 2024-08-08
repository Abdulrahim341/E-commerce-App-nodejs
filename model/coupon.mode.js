import mongoose, { model, Schema, Types } from "mongoose";
const schema=new mongoose.Schema({
    code:String,
    expires:Date,
    discount:Number
},{
    timestamps:true,
    versionKey:false
})


const Coupon=mongoose.model('Coupon',schema)
export default Coupon