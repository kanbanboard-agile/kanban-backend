import express from "express";
import TaskController from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Rute untuk Task
router.post("/tasks", authMiddleware, TaskController.createTask); // Membuat tugas baru
router.get("/tasks/:id", authMiddleware, TaskController.getTaskById); // Mendapatkan detail tugas
router.get(
  "/workspaces/:workspaceId/tasks",
  authMiddleware,
  TaskController.getWorkspaceTasks
);
router.put("/tasks/:id", authMiddleware, TaskController.updateTask); // Memperbarui tugas
router.delete("/tasks/:id", authMiddleware, TaskController.deleteTask); // Menghapus tugas

export default router;
