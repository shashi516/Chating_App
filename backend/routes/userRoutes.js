import express from 'express';
import { getOtherUsers, Login, LogOut, register } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router=express.Router();

router.post("/register",register)
router.post("/login",Login)
router.get("/logout",LogOut)
router.get("/",isAuthenticated,getOtherUsers); 

export default router;
