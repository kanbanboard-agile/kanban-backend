import cron from "node-cron";
import NotificationService from "../services/notificationServices.js";
import taskServices from "../services/taskServices.js";
import { getIO } from "../sockets/initSocket.js";

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

    console.log(`📅 Rentang Waktu: ${tomorrowStart} - ${tomorrowEnd}`);

    // Ambil task yang deadline-nya besok
    const { data: upcomingTasks } = await taskServices.getTasksByDeadlineRange(
      tomorrowStart,
      tomorrowEnd
    );

    if (upcomingTasks.length === 0) {
      console.log("ℹ️ Tidak ada task yang deadline besok.");
      return;
    }

    console.log(
      `📊 Ditemukan ${upcomingTasks.length} task yang mendekati deadline.`
    );

    for (const task of upcomingTasks) {
      console.log("🔍 Task yang sedang diproses:", task);

      // Akses id dengan benar dari TaskResponseDTO
      const taskId = task?.task?.id;
      const userId = task?.task?.userId;

      if (!taskId) {
        console.error("❌ task.id tidak valid atau undefined:", task);
        continue;
      }

      console.log(`📥 Mencari notifikasi untuk task ID: ${taskId}`);

      const existingNotification =
        await NotificationService.getNotificationByTaskId(taskId);

      if (existingNotification) {
        console.log(
          `🔔 Notifikasi sudah dikirim sebelumnya untuk task ID: ${taskId}`
        );
        continue;
      }

      const message = `📆 Reminder: Task "${task.task.title}" memiliki deadline besok (${task.task.deadline})`;

      await NotificationService.createNotification({
        task_id: taskId,
        userId: userId,
        message: message,
        type: "deadline",
        sent_at: new Date(),
        is_read: false,
      });

      const io = getIO();
      io.to(`user_${userId}`).emit("notification:new", {
        taskId: taskId,
        message,
        type: "deadline",
      });

      console.log(
        `✅ Notifikasi berhasil dikirim ke user ${userId} untuk task ${taskId}`
      );
    }
  } catch (error) {
    console.error("❌ Error saat memeriksa task deadline besok:", error);
  }
};

// Menjadwalkan cron job
export const startTaskDeadlineChecker = () => {
  cron.schedule("*/5 * * * * *", checkTaskDeadlines); // Jalan setiap 5 detik (untuk testing)
  console.log("🕒 Task deadline checker berjalan setiap 5 detik (testing).");
};
