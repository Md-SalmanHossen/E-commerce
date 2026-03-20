import express from "express";
const router = express.Router();
import * as adminController from "../controllers/admin.controller.js";
import adminVerify from "../middlewares/auth-verification-admin.middleware.js";

//!? =============super admin======================
router.post("/admin-register", adminController.register);
router.post("/admin-login", adminController.login);
router.get("/admin", adminVerify, adminController.getAdmin);
router.get('/admin-verify',adminVerify, adminController.verifyAdmin);
router.get('/admin-logout',adminVerify, adminController.logout);
router.put('/admin-update',adminVerify, adminController.update);

export default router;
