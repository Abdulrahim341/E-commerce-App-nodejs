import { Router } from "express";
import * as userController from './user.controller.js'
import validation from "../../middleware/validation.js";
import userchema from "./user.validation.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const router=Router()
router.post('/create',validation(userchema),checkEmail,userController.adduser) 
        .get('/',userController.getusers)
        .get('/:id',userController.getuser)
        .post('/:id',userController.updateuser)
        .delete('/:id',userController.deleteuser)




export default router