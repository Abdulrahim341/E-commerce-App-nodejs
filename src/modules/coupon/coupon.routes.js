import { Router } from "express";
import * as couponController from './coupon.controller.js'
// import validation from "../../middleware/validation.js";
// import brandschema from "./brand.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.use(protectedRoutes,allowedTO('admin'))
router.post('/create',couponController.addcoupon) 
        .get('/',couponController.getcoupons)
        .get('/:id',couponController.getcoupon)
        .post('/:id',couponController.updatecoupon)
        .delete('/:id',couponController.deletecoupon)




export default router
// ,validation(brandschema)