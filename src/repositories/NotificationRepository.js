import Notification from "../domain/model/notificationModel.js";
import { NotificationDTO } from "../domain/dto/NotificationDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

class NotificationRepository {
  // Helper untuk membungkus error dengan status code
  #throwError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }

  // Create Notification
  async createNotification(createNotificationRequestDTO) {
    const notification = await Notification.create({
      task_id: createNotificationRequestDTO.task_id,
      userId: createNotificationRequestDTO.userId,
      message: createNotificationRequestDTO.message,
      type: createNotificationRequestDTO.type,
      sent_at: createNotificationRequestDTO.sent_at || new Date(),
      is_read: createNotificationRequestDTO.is_read ?? false,
    });

    return notification;
  }

  // Get Notification by ID
  async findNotificationById(notification_id) {
    const notification = await Notification.findByPk(notification_id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    console.log("Notification from DB:", notification);
    return notification;
  }

  // Get All Notifications by User ID
  async findNotificationsByUserId(userId) {
    const notifications = await Notification.findAll({ where: { userId } });

    return notifications.map((notification) => new NotificationDTO(notification));
  }

  // Update Notification (e.g., mark as read)
  async updateNotification(notification_id, updateNotificationRequestDTO) {
    const notification = await Notification.findByPk(notification_id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    await notification.update({
      is_read: updateNotificationRequestDTO.is_read ?? notification.is_read,
    });

    console.log("Updated Notification from DB:", notification);

    return notification;
  }

  // Delete Notification
  async deleteNotification(notification_id) {
    try {
      const notification = await Notification.findByPk(notification_id);

      if (!notification) {
        this.#throwError(
          ERROR_MESSAGES.NOTIFICATION_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }

      await notification.destroy();

      return {
        data: null,
        message: SUCCESS_MESSAGES.NOTIFICATION_DELETED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.#throwError(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new NotificationRepository();
