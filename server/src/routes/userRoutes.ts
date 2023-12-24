import express from "express";
import multer from "multer";

const router = express.Router();

// ======== Multer ========
// Upload a avatar
const upload = multer({
    storage: multer.memoryStorage()
});
// =========================

// ======== Controllers ========
import userController from "../controllers/userController";
// =============================

// Create a new user
router.post("/create", userController.newUser);

// Login
router.post("/login", userController.login);

// Get a user by login
router.get("/gl/:login", userController.getUserByLogin);

// Edit a user
router.put("/edit/:id", userController.editUser);

// Upload avatar
router.post("/avatar/:id", upload.single("file"), userController.uploadAvatar);

// Upload banner
router.post("/banner/:id", upload.single("file"), userController.uploadBanner);

export default router;