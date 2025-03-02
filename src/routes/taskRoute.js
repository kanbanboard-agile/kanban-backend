import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

// Rute untuk Task
router.post('/tasks', TaskController.createTask); // Membuat tugas baru
router.get('/tasks/:id', TaskController.getTaskById); // Mendapatkan detail tugas
router.get('/workspaces/:workspaceId/tasks', TaskController.getWorkspaceTasks);
router.put('/tasks/:id', TaskController.updateTask); // Memperbarui tugas
router.delete('/tasks/:id', TaskController.deleteTask); // Menghapus tugas

export default router;
