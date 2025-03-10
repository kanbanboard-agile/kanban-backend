import express from "express";
import WorkspaceController from "../controllers/workspaceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rute untuk Workspace
router.post("/workspaces", authMiddleware, WorkspaceController.createWorkspace); // Membuat workspace baru
router.get(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.getWorkspaceById
); // Mendapatkan detail workspace
router.get(
  "/users/:userId/workspaces",
  authMiddleware,
  WorkspaceController.getUserWorkspaces
); // Mendapatkan semua workspace milik user
router.put(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.updateWorkspace
); // Memperbarui workspace
router.delete(
  "/workspaces/:id",
  authMiddleware,
  WorkspaceController.deleteWorkspace
); // Menghapus workspace

export default router;
