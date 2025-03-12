import TaskAttachment from '../domain/model/task_attachmentsModel.js';
import { TaskAttachmentDTO } from '../domain/dto/task_attachmentsDTO.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { SUCCESS_MESSAGES } from '../constants/messageConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';

class TaskAttachmentRepository {
  // Helper untuk membungkus error dengan status code
  throwError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }

  // Create Task Attachment
  async createTaskAttachment(createTaskAttachmentRequestDTO) {
    try {
      const attachment = await TaskAttachment.create({
        taskId: createTaskAttachmentRequestDTO.taskId,
        file_url: createTaskAttachmentRequestDTO.file_url,
        file_type: createTaskAttachmentRequestDTO.file_type,
      });

      return new TaskAttachmentDTO(attachment);
    } catch (error) {
      console.error('Database Error:', error); // Tambahkan logging
      this.throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Task Attachment by ID
  async findTaskAttachmentById(attachment_id) {
    try {
      const attachment = await TaskAttachment.findByPk(attachment_id);
      if (!attachment) {
        this.throwError(ERROR_MESSAGES.TASK_ATTACHMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }
      return new TaskAttachmentDTO(attachment);
    } catch (error) {
      this.throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Get All Attachments by Task ID
  async findAttachmentsByTaskId(taskId) {
    try {
      const attachments = await TaskAttachment.findAll({ where: { taskId } });
      return attachments.map((attachment) => new TaskAttachmentDTO(attachment));
    } catch (error) {
      this.throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Task Attachment
  async deleteTaskAttachment(attachment_id) {
    try {
      const attachment = await TaskAttachment.findByPk(attachment_id);
      if (!attachment) {
        this.throwError(ERROR_MESSAGES.TASK_ATTACHMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      await attachment.destroy();

      return {
        data: null,
        message: SUCCESS_MESSAGES.TASK_ATTACHMENT_DELETED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new TaskAttachmentRepository();
