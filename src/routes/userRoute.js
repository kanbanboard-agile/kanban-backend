import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

// Rute untuk pengguna
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/reset-password", UserController.requestResetPassword);
router.post("/reset-password/confirm", UserController.confirmResetPassword);

export default router;
