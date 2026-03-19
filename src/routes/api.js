import express from "express";
const router = express.Router();
import * as adminController from "../controllers/admin.controller.js";
import adminVerify from "../middlewares/auth-verification-admin.middleware.js";

//!? =============super admin======================
router.post("/admin-register", adminController.register);
router.post("/admin-login", adminController.login);
router.get("/admin", adminVerify, adminController.getAdmin);

export default router;
