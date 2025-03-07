import express from 'express';
import TaskAttachmentController from '../controllers/task_attachmentsController.js';

const router = express.Router();

// Rute untuk Task Attachments
router.post('/tasks/:taskId/attachments', TaskAttachmentController.addAttachment); // Menambahkan lampiran ke tugas
router.get('/tasks/:taskId/attachments', TaskAttachmentController.getAttachments); // Mendapatkan semua lampiran dari tugas
router.delete('/attachments/:attachmentId', TaskAttachmentController.deleteAttachment); // Menghapus lampiran berdasarkan ID

export default router;
