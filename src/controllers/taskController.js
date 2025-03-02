import TaskService from "../services/taskServices.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import {
  CreateTaskRequestDTO,
  UpdateTaskRequestDTO,
} from "../domain/dto/taskDTO.js";
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

class TaskController {
  // Buat Task baru
  async createTask(req, res) {
    try {
      const { workspaceId, title, description, status, progress, deadline, isAiGenerated } = req.body;

      // Validasi input
      if (!workspaceId || !title || !status || progress === undefined || !deadline) {
        throw new Error("workspaceId, title, status, progress, dan deadline harus diisi");
      }

      const dto = new CreateTaskRequestDTO(workspaceId, title, description, status, progress, deadline, isAiGenerated);
      const { data, message, statusCode } = await TaskService.createTask(dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan Task berdasarkan ID
  async getTaskById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID task harus diisi");
      }

      const { data, message, statusCode } = await TaskService.getTaskById(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan semua Task dalam Workspace tertentu
  async getWorkspaceTasks(req, res) {
    try {
      const { workspaceId } = req.params;

      if (!workspaceId) {
        throw new Error("workspaceId harus diisi");
      }

      const { data, message, statusCode } = await TaskService.getWorkspaceTasks(workspaceId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Perbarui Task
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status, progress, deadline, isAiGenerated } = req.body;

      if (!id || (!title && !description && !status && progress === undefined && !deadline && isAiGenerated === undefined)) {
        throw new Error("ID task dan setidaknya satu field harus diisi untuk diperbarui");
      }

      const dto = new UpdateTaskRequestDTO(title, description, status, progress, deadline, isAiGenerated);
      const { data, message, statusCode } = await TaskService.updateTask(id, dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Hapus Task
  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID task harus diisi");
      }

      const { data, message, statusCode } = await TaskService.deleteTask(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new TaskController();
