import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../config/multerConfig.js';
import TaskAttachmentController from '../controllers/task_attachmentsController.js';

const router = express.Router();

// Rute untuk Task Attachments
router.post('/tasks/:taskId/attachments', authMiddleware, upload.single('file'), TaskAttachmentController.addAttachment);
router.get('/tasks/:taskId/attachments', authMiddleware, TaskAttachmentController.getAttachments);
router.delete('/tasks/attachments/:attachmentId', authMiddleware, TaskAttachmentController.deleteAttachment);

export default router;
