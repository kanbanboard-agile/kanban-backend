import express from 'express';
import WorkspaceController from '../controllers/workspaceController.js'; 

const router = express.Router();

// Rute untuk Workspace
router.post('/workspaces', WorkspaceController.createWorkspace); // Membuat workspace baru
router.get('/workspaces/:id', WorkspaceController.getWorkspaceById); // Mendapatkan detail workspace
router.get('/users/:userId/workspaces', WorkspaceController.getUserWorkspaces); // Mendapatkan semua workspace milik user
router.put('/workspaces/:id', WorkspaceController.updateWorkspace); // Memperbarui workspace
router.delete('/workspaces/:id', WorkspaceController.deleteWorkspace); // Menghapus workspace

export default router;
