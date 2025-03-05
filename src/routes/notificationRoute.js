import express from 'express';
import NotificationController from '../controllers/notificationController.js';

const router = express.Router();

// Rute untuk Notifikasi
router.post('/notifications', NotificationController.createNotification); // Membuat notifikasi baru
router.get('/notifications/:id', NotificationController.getNotificationById); // Mendapatkan notifikasi berdasarkan ID
router.get('/users/:userId/notifications', NotificationController.getUserNotifications); // Mendapatkan semua notifikasi pengguna
router.delete('/notifications/:id', NotificationController.deleteNotification); // Menghapus notifikasi

export default router;
