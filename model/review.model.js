import mongoose, { model, Schema, Types } from "mongoose";
const schema=new Schema({
    comment:String,
    user:{
        type:Types.ObjectId,
        required:[true,'user is required'],
        ref:'User'
    },
    product:{
        type:Types.ObjectId,
        required:[true,'product is required'],
        ref:'Product'
    },
    rate:{
        type:Number,
        required:[true,'rate is required'],
        max:5,
        min:0
    }
},{
    timestamps:true,
    versionKey:false
})

schema.pre(/^find/,function(){
    this.populate('user','name')
})

const Review=model('Review',schema)
export default Review