import slugify from "slugify";
import asyncHandler from "../../middleware/asyncHandler.js";
import AppError from "../../utils/Error.js";
import Product from "../../../model/product.model.js";
import ApiFeatures from "../../utils/ApiFeatures.js";



export const addproduct=asyncHandler(async(req,res,next)=>{
    req.body.mainImage=req.files.mainImage[0].filename
    req.body.coverImages=req.files.coverImages.map(element=>element.filename)
    req.body.slug =slugify(req.body.title)
    const product=await Product.create(req.body)
    return res.status(201).json({message:"success",Product,status:201})
})


export const getproducts=asyncHandler(async(req,res,next)=>{
let ApiFeature =new ApiFeatures(Product.find(),req.query).pagination().sort().fields().search().filter()
// ApiFeature= ApiFeature
const products = await ApiFeature.mongooseQuery
// .populate(
//         [
//             {
//                 path:'category'
//             },{
//                 path:'subcategory'
//             },{
//                 path:'brand'
//             }
//         ]
//     )
return products.length==0?
next (new AppError('products not found',404)):
res.status(200).json({message:"success",pageNumber:ApiFeatures.data,products,status:200})
})
//,pageNumber:page,size:limit

export const getproduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    return !product?
    next (new AppError('product not found',404)):
    res.status(200).json({message:"success",product,status:200})
})


export const updateproduct=asyncHandler(async(req,res,next)=>{
    req.body.mainImage=req.files?.mainImage[0]?.filename
    req.body.coverImages=req.files?.coverImages?.map(element=>element.filename)
    req.body.slug=slugify(req.body.title)
    const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !product?
    next (new AppError('product not found',404)):
    res.status(200).json({message:"success",product,status:200})
})

export const deleteproduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findByIdAndDelete(req.params.id)
    return !product?
    next (new AppError('product not found',404)):
    res.status(200).json({message:"success",product,status:200})
})
