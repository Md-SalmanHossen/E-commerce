import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import adminVerify from "../middlewares/auth-verification-admin.middleware.js";
import *as userController from '../controllers/user.controller.js'
import userVerify from './../middlewares/auth-verification-user.middleware.js';


const router = express.Router()


//? =============super admin======================
router.post("/admin-register", adminController.register);
router.post("/admin-login", adminController.login);
router.get("/admin", adminVerify, adminController.getAdmin);
router.get('/admin-verify',adminVerify, adminController.verifyAdmin);
router.get('/admin-logout',adminVerify, adminController.logout);
router.put('/admin-update',adminVerify, adminController.update);


//? ============user =============================
router.post('/user-register', userController.register);
router.post('/user-login', userController.login);
router.get('/user',userVerify, userController.getUser);
router.get('/user-verify',userVerify, userController.verifyUser);
router.get('/user-logout',userVerify, userController.logout);

export default router;
