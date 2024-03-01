import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

// ======== Controllers ========

// =============================

// Create a new post
router.post("/create", postController.newPost);

// Get posts by user login
router.get("/gbu/:user_login", postController.getPostsByUserLogin); // gbu = get by user

export default router;