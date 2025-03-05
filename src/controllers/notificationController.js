import NotificationService from "../services/notificationServices.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";
import { CreateNotificationRequestDTO, UpdateNotificationRequestDTO } from "../domain/dto/NotificationDTO.js";

// Helper untuk membangun respons sukses
const buildSuccessResponse = (res, { data, message, statusCode }) => {
  return res.status(statusCode).json({ success: true, message, data });
};

// Helper untuk menangani respons error
const handleErrorResponse = (res, error) => {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({ success: false, message, data: null });
};

class NotificationController {
  // Buat Notifikasi baru
  async createNotification(req, res) {
    try {
      const { task_id, userId, message, type, sent_at, is_read } = req.body;

      if (!task_id || !userId || !message || !type) {
        throw new Error("task_id, userId, message, dan type harus diisi");
      }

      const dto = new CreateNotificationRequestDTO(task_id, userId, message, type, sent_at, is_read);
      const { data, message: msg, statusCode } = await NotificationService.createNotification(dto);
      return buildSuccessResponse(res, { data, message: msg, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan Notifikasi berdasarkan ID
  async getNotificationById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID notifikasi harus diisi");
      }

      const { data, message, statusCode } = await NotificationService.getNotificationById(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan semua Notifikasi berdasarkan User ID
  async getUserNotifications(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new Error("userId harus diisi");
      }

      const { data, message, statusCode } = await NotificationService.getUserNotifications(userId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Perbarui Notifikasi (misalnya, tandai sebagai telah dibaca)
  async updateNotification(req, res) {
    try {
      const { id } = req.params;
      const { is_read } = req.body;

      if (!id || is_read === undefined) {
        throw new Error("ID notifikasi dan status is_read harus diisi");
      }

      const dto = new UpdateNotificationRequestDTO(is_read);
      const { data, message, statusCode } = await NotificationService.updateNotification(id, dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Hapus Notifikasi
  async deleteNotification(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID notifikasi harus diisi");
      }

      const { data, message, statusCode } = await NotificationService.deleteNotification(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new NotificationController();
