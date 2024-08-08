import dbconnection from "../datatbase/connection.js";
import globalError from "./middleware/globalError.js";
import categoryRouter from './modules/category/category.routes.js'
import brandRouter from './modules/brand/brand.routes.js'
import subcategoryRouter from './modules/subcategory/subcategory.routes.js'
import productRouter from './modules/product/product.routes.js'
import userRouter from './modules/user(admin)/user.routes.js'
import authRouter from './modules/auth/auth.routes.js'
import reviewRouter from './modules/review/review.routes.js'
import wishlistRouter from './modules/wishlist/wishlist.routes.js'
import addressRouter from './modules/address/address.routes.js'
import couponRouter from './modules/coupon/coupon.routes.js'
import cartRouter from './modules/cart/cart.routes.js'
import orderRouter from './modules/order/order.routes.js'
const bootstrab=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err);
        console.log('error in code',err.details);
    })
    const baseUrl='/api/v1'
    app.use(express.json())
    app.use( '/uploads',express.static('uploads'))
    app.use(`${baseUrl}/categories`,categoryRouter)
    app.use(`${baseUrl}/brands`,brandRouter)
    app.use(`${baseUrl}/subcategories`,subcategoryRouter)
    app.use(`${baseUrl}/products`,productRouter)
    app.use(`${baseUrl}/users`,userRouter)
    app.use(`${baseUrl}/auth`,authRouter)
    app.use(`${baseUrl}/reviews`,reviewRouter)
    app.use(`${baseUrl}/wishlists`,wishlistRouter)
    app.use(`${baseUrl}/addresses`,addressRouter)
    app.use(`${baseUrl}/coupons`,couponRouter)
    app.use(`${baseUrl}/carts`,cartRouter)
    app.use(`${baseUrl}/orders`,orderRouter)

    app.use('*',(_,res)=>{
        return res.json ({message:'not found'})
    })
    process.on('unhandledRejection',(err)=>{
        console.log('error',err);
    })
    app.use(globalError)
}
export default bootstrab