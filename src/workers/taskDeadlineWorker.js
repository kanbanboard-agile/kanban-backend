import cron from "node-cron";
import TaskService from "../services/taskService.js";
import NotificationService from "../services/notificationServices.js";
import { getIO } from "./socket.js";

// Fungsi untuk memeriksa task yang akan deadline besok
const checkTaskDeadlines = async () => {
  console.log("🔍 Memeriksa task yang mendekati deadline besok...");

  try {
    // Hitung waktu besok (00:00 - 23:59)
    const now = new Date();
    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);

    // Ambil task yang deadline-nya besok
    const { data: upcomingTasks } = await TaskService.getTasksByDeadlineRange(
      tomorrowStart,
      tomorrowEnd
    );

    for (const task of upcomingTasks) {
      // Cek apakah notifikasi untuk task ini sudah pernah dikirim
      const existingNotification = await NotificationService.findByTaskId(
        task.id
      );
      if (existingNotification) continue;

      const message = `📆 Reminder: Task "${task.title}" memiliki deadline besok (${task.deadline})`;

      // Simpan notifikasi di database
      await NotificationService.createNotification({
        task_id: task.id,
        userId: task.userId,
        message: message,
        type: "deadline",
        sent_at: new Date(),
        is_read: false,
      });

      // Kirim notifikasi real-time via Socket.IO
      const io = getIO();
      io.to(`user_${task.userId}`).emit("notification:new", {
        taskId: task.id,
        message,
        type: "deadline",
      });

      console.log(
        `✅ Notifikasi dikirim ke user ${task.userId} untuk task ${task.id}`
      );
    }
  } catch (error) {
    console.error("❌ Error saat memeriksa task deadline besok:", error);
  }
};

// Menjadwalkan pengecekan setiap hari jam 00:00
export const startTaskDeadlineChecker = () => {
  cron.schedule("0 0 * * *", checkTaskDeadlines);
  console.log(
    "🕒 Task deadline checker dijalankan setiap hari pada jam 00:00."
  );
};
