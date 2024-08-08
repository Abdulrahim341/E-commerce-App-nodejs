import { Router } from "express";
import * as productController from './product.controller.js'
import { customValidation, upload } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";
import productschema from "./product.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('user','admin'),upload(customValidation.images,'product').fields([{name:'mainImage',maxCount:1},{name:'coverImages',maxCount:5}]),validation(productschema),productController.addproduct) 
        .get('/',productController.getproducts)
        .get('/:id',productController.getproduct)
        .post('/:id',protectedRoutes,allowedTO('user','admin'),upload(customValidation.images,'product').fields([{name:'mainImage',maxCount:1},{name:'coverImages',maxCount:5}]),productController.updateproduct)
        .delete('/:id',protectedRoutes,allowedTO('user','admin'),productController.deleteproduct)




export default router