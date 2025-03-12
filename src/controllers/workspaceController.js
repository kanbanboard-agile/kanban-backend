import WorkspaceService from '../services/workspaceService.js';
import S3Service from '../services/S3Service.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { CreateWorkspaceRequestDTO, UpdateWorkspaceRequestDTO } from '../domain/dto/workspaceDTO.js';
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

class WorkspaceController {
  // Buat Workspace baru
  async createWorkspace(req, res) {
    try {
      const userId = req.user.id; // Ambil dari token via authMiddleware
      const { name, priority } = req.body;

      // Validasi input
      if (!name) {
        const error = new Error('name harus diisi');
        error.statusCode = STATUS_CODES.BAD_REQUEST;
        throw error;
      }

      let logoUrl = req.body.logoUrl; // Dukung logoUrl dari JSON
      if (req.file) {
        console.log('Uploading logo to S3:', req.file.originalname);
        logoUrl = await S3Service.uploadFile(req.file, 'workspaces');
        console.log('Logo uploaded to S3:', logoUrl);
      }

      const dto = new CreateWorkspaceRequestDTO(userId, name, priority, logoUrl);
      const { data, message, statusCode } = await WorkspaceService.createWorkspace(dto);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      console.error('Error in createWorkspace:', error.message);
      return handleErrorResponse(res, error);
    }
  }

  // Dapatkan Workspace berdasarkan ID
  async getWorkspaceById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('ID workspace harus diisi');
      }

      const { data, message, statusCode } = await WorkspaceService.getWorkspaceById(id);
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
        throw new Error('userId harus diisi');
      }

      const { data, message, statusCode } = await WorkspaceService.getUserWorkspaces(userId);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Perbarui Workspace
  async updateWorkspace(req, res) {
    try {
      const { id } = req.params;
      const { name, priority } = req.body;

      if (!id) {
        throw new Error('ID workspace harus diisi');
      }

      let logoUrl = null;
      if (req.file) {
        // Upload file logo ke S3
        logoUrl = await S3Service.uploadFile(req.file, 'workspaces');
      }

      const dto = new UpdateWorkspaceRequestDTO(name, priority, logoUrl);
      const { data, message, statusCode } = await WorkspaceService.updateWorkspace(id, dto);
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
        throw new Error('ID workspace harus diisi');
      }

      const { data, message, statusCode } = await WorkspaceService.deleteWorkspace(id);
      return buildSuccessResponse(res, { data, message, statusCode });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new WorkspaceController();
