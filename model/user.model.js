
import mongoose, { model, Schema, Types } from "mongoose";
import bcrybt from 'bcrypt'
const schema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    passwordChangedAt:Date,
    wishlist:[{
        type:Types.ObjectId,
        ref:'Product'
    }],
    addresses:[{
        city:'String',
        street:'String',
        phoneNo:'String'
    }]
},{
    timestamps:true,
    versionKey:false
})

schema.pre('save',function(){
    this.password=bcrybt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate',function(){
    if(this._update.password)
    this._update.password=bcrybt.hashSync(this._update.password,8)
})
const User=model('User',schema)
export default User