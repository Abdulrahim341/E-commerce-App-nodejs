import { Router } from "express";
import * as subcategoryController from './subcategory.controller.js'
import validation from "../../middleware/validation.js";
import subcategoryschema from "./subcategory.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router({mergeParams:true})
router.post('/create',protectedRoutes,allowedTO('user','admin'),validation(subcategoryschema),subcategoryController.addsubcategory) 
        .get('/',subcategoryController.getsubcategories)
        .get('/subcategories',subcategoryController.getsubcategoryBymerge)
        .get('/:id',subcategoryController.getsubcategory)
        .post('/:id',protectedRoutes,allowedTO('user','admin'),subcategoryController.updatesubcategory)
        .delete('/:id',protectedRoutes,allowedTO('user','admin'),subcategoryController.deletesubcategory)




export default router