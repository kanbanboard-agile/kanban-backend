// TaskAttachmentService.js
import TaskAttachmentRepository from "../repositories/task_attachmentsRepository.js";
import {
  TaskAttachmentDTO,
  CreateTaskAttachmentRequestDTO,
  DeleteTaskAttachmentResponseDTO,
} from "../domain/dto/task_attachmentsDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const buildResponse = (data, message, statusCode) => {
  return { data, message, statusCode };
};

class TaskAttachmentService {
  async createTaskAttachment({ taskId, file_url, file_type }) {
    const createTaskAttachmentRequestDTO = new CreateTaskAttachmentRequestDTO(taskId, file_url, file_type);
    const attachment = await TaskAttachmentRepository.createTaskAttachment(createTaskAttachmentRequestDTO);
    const data = new TaskAttachmentDTO(attachment);
    return buildResponse(data, SUCCESS_MESSAGES.ATTACHMENT_CREATED, STATUS_CODES.CREATED);
  }

  async getTaskAttachmentById(id) {
    const attachment = await TaskAttachmentRepository.findTaskAttachmentById(id);
    if (!attachment) {
      throwError(ERROR_MESSAGES.ATTACHMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new TaskAttachmentDTO(attachment);
    return buildResponse(data, SUCCESS_MESSAGES.ATTACHMENT_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  async getTaskAttachmentsByTaskId(taskId) {
    const attachments = await TaskAttachmentRepository.findAttachmentsByTaskId(taskId);
    const data = attachments.map((attachment) => new TaskAttachmentDTO(attachment));
    return buildResponse(data, SUCCESS_MESSAGES.TASK_ATTACHMENTS_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  async deleteTaskAttachment(id) {
    await TaskAttachmentRepository.deleteTaskAttachment(id);
    const data = new DeleteTaskAttachmentResponseDTO("Lampiran berhasil dihapus");
    return buildResponse(data, SUCCESS_MESSAGES.ATTACHMENT_DELETED, STATUS_CODES.SUCCESS);
  }
}

export default new TaskAttachmentService();