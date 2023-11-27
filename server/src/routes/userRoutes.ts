import express from "express";

const router = express.Router();

// ======== Controllers ========
import userController from "../controllers/userController";
// =============================

router.post("/create", userController.newUser);
router.post("/login", userController.login);

export default router;