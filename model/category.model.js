import mongoose, { model, Schema, Types } from "mongoose";
const schema= new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
        unique:[true,'name is unique'],
        minLength:[2,'min length is 2 character'],
        maxLength:[25,'max length is 25 character']
    },
    slug:{
        type:String,
        required:[true,'name is required'],
        lowerCase:true
    },
    image:String,
    createdBy:{
        type:Types.ObjectId,
        // required:[true,'createdBy is required'],
        // ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,
        // ref:'User'
    }
},{
    timestamps:true,
    versionKey:false
})
schema.post('init', (doc) =>{
    if(doc.image){
    doc.image = process.env.BASE_URL+'category/' + doc.image   
    }
    
})
const Category=model('Category',schema)
export default Category