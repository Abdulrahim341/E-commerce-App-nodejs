import { Router } from "express";
import * as categoryController from './category.controller.js'
import { customValidation, upload } from "../../middleware/fileUpload.js";
import subcategoryRouter from '../subcategory/subcategory.routes.js'
import validation from "../../middleware/validation.js";
import categoryschema from "./category.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('user','admin'),upload(customValidation.images,'category').single('image'),validation(categoryschema),categoryController.addcategory) 
        .get('/',categoryController.getcategories)
        .get('/:id',categoryController.getcategory)
        .post('/:id',protectedRoutes,allowedTO('user','admin'),upload(customValidation.images,'category').single('image'),categoryController.updatecategory)
        .delete('/:id',protectedRoutes,allowedTO('user','admin'),categoryController.deletecategory)
        .use('/:id',subcategoryRouter)




export default router