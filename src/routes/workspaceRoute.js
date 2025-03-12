import express from 'express';
import WorkspaceController from '../controllers/workspaceController.js';
import upload from '../config/multerConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute untuk workspace
router.post('/create', authMiddleware, upload.single('logo'), WorkspaceController.createWorkspace);
router.get('/workspaces/:id', authMiddleware, WorkspaceController.getWorkspaceById);
router.get('/users/:userId/workspaces', authMiddleware, WorkspaceController.getUserWorkspaces);
router.put('/workspaces/:id', authMiddleware, upload.single('logo'), WorkspaceController.updateWorkspace);
router.delete('/workspaces/:id', authMiddleware, WorkspaceController.deleteWorkspace);

export default router;
