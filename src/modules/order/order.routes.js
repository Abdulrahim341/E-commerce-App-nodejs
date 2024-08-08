import { Router } from "express";
import * as orderController from './order.controller.js'
// import validation from "../../middleware/validation.js";
// import brandschema from "./brand.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.post('/:id',protectedRoutes,allowedTO('user'),orderController.createCashOrder)
        .get('/',protectedRoutes,allowedTO('user'),orderController.getUserOrders) 
        .get('/allorders',protectedRoutes,allowedTO('admin'),orderController.getAllOrders)
        .post('/checkout/:id',protectedRoutes,allowedTO('user'),orderController.createCheckoutSession)
        // .put('/:id',orderController.updateQuantity)
        // .delete('/:id',orderController.removeFromorder)




export default router
// ,validation(brandschema)