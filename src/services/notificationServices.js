import NotificationRepository from '../repositories/NotificationRepository.js';
import {
  NotificationDTO,
  CreateNotificationRequestDTO,
  NotificationResponseDTO,
  DeleteNotificationResponseDTO,
} from '../domain/dto/NotificationDTO.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { SUCCESS_MESSAGES } from '../constants/messageConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';

// Fungsi utilitas untuk validasi DTO
const validateDTO = (dto, DTOClass) => {
  if (!(dto instanceof DTOClass)) {
    throwError(ERROR_MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST);
  }
};

// Fungsi utilitas untuk membungkus error
const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

// Fungsi utilitas untuk membangun response
const buildResponse = (data, message, statusCode) => {
  return { data, message, statusCode };
};

class NotificationService {
  // Buat notifikasi baru
  async createNotification(createNotificationRequestDTO) {
    validateDTO(createNotificationRequestDTO, CreateNotificationRequestDTO);
    const notification = await NotificationRepository.createNotification(createNotificationRequestDTO);
    const data = new NotificationResponseDTO(notification);
    return buildResponse(data, SUCCESS_MESSAGES.NOTIFICATION_CREATED, STATUS_CODES.CREATED);
  }

  // Dapatkan notifikasi berdasarkan ID
  async getNotificationById(id) {
    const notification = await NotificationRepository.findNotificationById(id);
    if (!notification) {
      throwError(ERROR_MESSAGES.NOTIFICATION_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new NotificationDTO(notification);
    return buildResponse(data, SUCCESS_MESSAGES.NOTIFICATION_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  // Dapatkan semua notifikasi untuk pengguna tertentu
  async getUserNotifications(userId) {
    const notifications = await NotificationRepository.findNotificationsByUserId(userId);
    const data = notifications.map((notification) => new NotificationResponseDTO(notification));
    return buildResponse(data, SUCCESS_MESSAGES.USER_NOTIFICATIONS_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  // Hapus notifikasi
  async deleteNotification(id) {
    await NotificationRepository.deleteNotification(id);
    const data = new DeleteNotificationResponseDTO('Notifikasi berhasil dihapus');
    return buildResponse(data, SUCCESS_MESSAGES.NOTIFICATION_DELETED, STATUS_CODES.SUCCESS);
  }
}

export default new NotificationService();
