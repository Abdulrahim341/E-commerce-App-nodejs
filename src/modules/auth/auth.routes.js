import { Router } from "express";
import * as authController from './auth.controller.js'
import { checkEmail } from "../../middleware/checkEmail.js";


const router=Router()
router.post('/signup',checkEmail,authController.signUp)
        .post('/signin',authController.signIn)
        .patch('/changepassword',authController.changeUserPassword)

export default router