// TaskAttachmentController.js
import TaskAttachmentService from "../services/task_attachmentsService.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

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

class TaskAttachmentController {
  // Tambah lampiran ke Task
  async addAttachment(req, res) {
    try {
      const { taskId } = req.params;
      const { file_url, file_type } = req.body; 
      
      if (!taskId || !file_url || !file_type) {
        throw new Error("taskId, fileUrl, dan fileType harus diisi");
      }

      const { data, message, statusCode } = await TaskAttachmentService.createTaskAttachment({ 
        taskId, 
        file_url, 
        file_type
      });

      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
}

  // Dapatkan semua lampiran berdasarkan Task ID
  async getAttachments(req, res) {
    try {
      const { taskId } = req.params;
      if (!taskId) {
        throw new Error("taskId harus diisi");
      }

      const { data, message, statusCode } = await TaskAttachmentService.getTaskAttachmentsByTaskId(taskId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Hapus lampiran berdasarkan ID
  async deleteAttachment(req, res) {
    try {
      const { attachmentId } = req.params;
      if (!attachmentId) {
        throw new Error("attachmentId harus diisi");
      }

      const { data, message, statusCode } = await TaskAttachmentService.deleteTaskAttachment(attachmentId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new TaskAttachmentController();