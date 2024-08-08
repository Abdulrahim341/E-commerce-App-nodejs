import { Router } from "express";
import * as addressController from './address.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.patch('/',protectedRoutes,allowedTO('user'),addressController.addAddress) 
        .delete('/:id',protectedRoutes,allowedTO('user'),addressController.removeAddress) 
        .get('/',protectedRoutes,allowedTO('user'),addressController.getLoggedUserAddresses) 





export default router