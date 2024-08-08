import { Router } from "express";
import * as cartController from './cart.controller.js'
// import validation from "../../middleware/validation.js";
// import brandschema from "./brand.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.use(protectedRoutes,allowedTO('user'))
router.post('/create',cartController.addToCart)
        .post('/apply-coupon',cartController.applyCoupon) 
        .get('/',cartController.getloggedUserCart)
        .delete('/',cartController.clearUserCart)
        .put('/:id',cartController.updateQuantity)
        .delete('/:id',cartController.removeFromCart)




export default router
// ,validation(brandschema)