import express from "express";

const router = express.Router();

// ======== Controllers ========
import userController from "../controllers/userController";
// =============================

router.post("/create", userController.newUser);

export default router;