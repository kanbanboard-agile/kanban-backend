// TaskAttachmentController.js
import TaskAttachmentService from '../services/task_attachmentsService.js';
import S3Service from '../services/S3Service.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';

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
      const file = req.file; // File dari Multer

      if (!taskId || !file) {
        throw new Error('taskId dan file harus diisi');
      }
      const file_type = file.mimetype;
      const file_url = await S3Service.uploadFile(file, 'task-attachments');

      const { data, message, statusCode } = await TaskAttachmentService.createTaskAttachment({
        taskId,
        file_url,
        file_type,
      });

      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      console.error('Error in addAttachment:', error.message); // Tambah log untuk debug
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan semua lampiran berdasarkan Task ID
  async getAttachments(req, res) {
    try {
      const { taskId } = req.params;
      if (!taskId) {
        throw new Error('taskId harus diisi');
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
        throw new Error('attachmentId harus diisi');
      }

      // Ambil attachment dari database sebelum hapus
      const attachment = await TaskAttachmentService.getTaskAttachmentById(attachmentId);
      const fileUrl = attachment.data.file_url;

      // Hapus file dari S3 (opsional, tambah logika ini)
      if (fileUrl && fileUrl.startsWith('https://')) {
        const key = fileUrl.split('.com/')[1]; // Ekstrak Key dari URL
        const params = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        };
        const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
        await s3Client.send(new DeleteObjectCommand(params));
        console.log('File deleted from S3:', key);
      }

      const { data, message, statusCode } = await TaskAttachmentService.deleteTaskAttachment(attachmentId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      console.error('Error in deleteAttachment:', error.message);
      return handleErrorResponse(res, error);
    }
  }
}

export default new TaskAttachmentController();
