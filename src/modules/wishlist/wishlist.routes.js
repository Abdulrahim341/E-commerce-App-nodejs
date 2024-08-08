import { Router } from "express";
import * as wishlistController from './wishlist.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";

const router=Router()
router.patch('/',protectedRoutes,allowedTO('user'),wishlistController.addToWishlist) 
        .delete('/:id',protectedRoutes,allowedTO('user'),wishlistController.removeFROMWishlist) 
        .get('/',protectedRoutes,allowedTO('user'),wishlistController.getLoggedUserWishlist) 





export default router