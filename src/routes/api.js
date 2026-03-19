import express from "express";
const router=express.Router();
import *as adminController from '../controllers/admin.controller.js'

//!? =============super admin======================
router.post('/admin-register',adminController.register);
router.post('/admin-login',adminController.login);

export default router;