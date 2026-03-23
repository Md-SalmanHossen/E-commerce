import express from "express";
import adminVerify from "../middlewares/auth-verification-admin.middleware.js";
import userVerify from './../middlewares/auth-verification-user.middleware.js';

import * as adminController from "../controllers/admin.controller.js";
import *as userController from '../controllers/user.controller.js'
import *as productController from '../controllers/product.controller.js'


const router = express.Router()


//? =============super admin======================
router.post("/admin-register", adminController.register);
router.post("/admin-login", adminController.login);
router.get("/admin", adminVerify, adminController.getAdmin);
router.get('/admin-verify',adminVerify, adminController.verifyAdmin);
router.get('/admin-logout',adminVerify, adminController.logout);
router.put('/admin-update',adminVerify, adminController.update);


//? ==================== user =============================
router.post('/user-register', userController.register);
router.post('/user-login', userController.login);
router.get('/user',userVerify, userController.getUser);
router.get('/user-verify',userVerify, userController.verifyUser);
router.get('/user-logout',userVerify, userController.logout);
router.put('/user-update',userVerify, userController.update);


//? ==================== product =============================
router.post('/product-create',adminVerify,productController.createProduct);

export default router;
