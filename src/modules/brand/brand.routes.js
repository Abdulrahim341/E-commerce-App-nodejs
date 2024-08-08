import { Router } from "express";
import * as brandController from './brand.controller.js'
import validation from "../../middleware/validation.js";
import brandschema from "./brand.validation.js";
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('user','admin'),validation(brandschema),brandController.addbrand) 
        .get('/',brandController.getbrands)
        .get('/:id',brandController.getbrand)
        .post('/:id',protectedRoutes,allowedTO('user','admin'),brandController.updatebrand)
        .delete('/:id',protectedRoutes,allowedTO('user','admin'),brandController.deletebrand)




export default router