import WorkspaceService from "../services/workspaceService.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import {
  CreateWorkspaceRequestDTO,
  UpdateWorkspaceRequestDTO,
} from "../domain/dto/workspaceDTO.js";
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

class WorkspaceController {
  // Buat Workspace baru
  async createWorkspace(req, res) {
    try {
      const { userId, name, logoUrl, attachment } = req.body;

      // Validasi input
      if (!userId || !name) {
        throw new Error("userId dan name harus diisi");
      }

      const dto = new CreateWorkspaceRequestDTO(
        userId,
        name,
        logoUrl,
        attachment
      );
      const { data, message, statusCode } =
        await WorkspaceService.createWorkspace(dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan Semua Workspaces
  async getAllWorkspace(req, res) {
    try {
      const { data, message, statusCode } =
        await WorkspaceService.getAllWorkspace();
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan Workspace berdasarkan ID
  async getWorkspaceById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID workspace harus diisi");
      }

      const { data, message, statusCode } =
        await WorkspaceService.getWorkspaceById(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan semua Workspace milik User tertentu
  async getUserWorkspaces(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new Error("userId harus diisi");
      }

      const { data, message, statusCode } =
        await WorkspaceService.getUserWorkspaces(userId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Perbarui Workspace
  async updateWorkspace(req, res) {
    try {
      const { id } = req.params;
      const { name, logoUrl, attachment } = req.body;

      if (!id || (!name && !logoUrlm && !attachment)) {
        throw new Error(
          "ID workspace dan setidaknya satu field (name atau logoUrl) harus diisi"
        );
      }

      const dto = new UpdateWorkspaceRequestDTO(name, logoUrl, attachment);
      const { data, message, statusCode } =
        await WorkspaceService.updateWorkspace(id, dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Hapus Workspace
  async deleteWorkspace(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID workspace harus diisi");
      }

      const { data, message, statusCode } =
        await WorkspaceService.deleteWorkspace(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new WorkspaceController();
