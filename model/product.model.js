import mongoose, { Schema, Types,model } from "mongoose";
const schema=new Schema({
    title:{
        type:String,
        required:[true,'title is required'],
        trim:true,
        minLength:[2,'min length is 2 character'],
        maxLength:[25,'max length is 25 character']
    },
    describtion:{
        type:String,
        required:[true,'description is required'],
        trim:true,
        minLength:[3,'min length is 2 character'],
        maxLength:[2500,'max length is 25 character']
    },
    slug:{
        type:String,
        required:[true,'name is required'],
        lowerCase:true
    },
    mainImage:String,
    coverImages:[String],
    price:{
        type:Number,
        required:[true,'price is required'],
        min:[0,'min price is 0']
    },
    priceAfterDiscount:{
        type:Number,
        min:[0,'min price is 0']
    },
    stock:{
        type:Number,
        required:[true,'stock is required'],
        min:[0,'min stock is 0']
    },
    sold:{
        type:Number,
        min:[0,'min sold is 0'],
        default:0
    },
    rateCount:{
        type:Number,
        min:[0,'min rateCount is 0'],
        default:0
    },
    rateAverage:{
        type:Number,
        min:[0,'min rateAverage is 0'],
        default:0
    },
    createdBy:{
        type:Types.ObjectId,
        // required:[true,'createdBy is required'],
        // ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,
        // ref:'User'
    },
    category:{
        type:Types.ObjectId,
        required:[true,'categorey is required'],
        ref:'Category'
    },
    subcategory:{
        type:Types.ObjectId,
        required:[true,'subCategorey is required'],
        ref:'Subcategory'
    },
    brand:{
        type:Types.ObjectId,
        required:[true,'brand is required'],
        ref:'Brand'
    }
},{
    timestamps:true,
    versionKey:false,
    toJSON:{virtuals:true},
    id:false
})

schema.virtual('myReviews',{
    ref:"Review",
    localField:"_id",
    foreignField:"product"
})
schema.pre('findOne',function(){
    this.populate('myReviews')
})




schema.post('init', (doc) =>{
    if(doc.mainImage){
        doc.mainImage = process.env.BASE_URL+'product/' + doc.mainImage
    }
    if(doc.coverImages){
        doc.coverImages=doc.coverImages?.map(img=> process.env.BASE_URL+'product/'+img )
    }

})
const Product=model('Product',schema)
export default Product