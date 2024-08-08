import { Router } from "express";
import * as reviewController from './review.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import validation from "../../middleware/validation.js";
import reviewschema from "./review.validation.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('user'),validation(reviewschema),reviewController.addreview) 
        .get('/',reviewController.getreviews)
        .get('/:id',reviewController.getreview)
        .post('/:id',protectedRoutes,allowedTO('user'),reviewController.updatereview)
        .delete('/:id',protectedRoutes,allowedTO('user','admin'),reviewController.deletereview)




export default router

// validation(reviewschema),