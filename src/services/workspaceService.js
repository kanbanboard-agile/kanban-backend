import WorkspaceRepository from '../repositories/workspaceRepository.js';
import {
  WorkspaceDTO,
  CreateWorkspaceRequestDTO,
  UpdateWorkspaceRequestDTO,
  WorkspaceResponseDTO,
  DeleteWorkspaceResponseDTO,
} from '../domain/dto/workspaceDTO.js';
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

class WorkspaceService {
  // Buat Workspace baru
  async createWorkspace(createWorkspaceRequestDTO) {
    validateDTO(createWorkspaceRequestDTO, CreateWorkspaceRequestDTO);
    const workspace = await WorkspaceRepository.createWorkspace(createWorkspaceRequestDTO);
    const data = new WorkspaceResponseDTO(workspace);
    return buildResponse(data, SUCCESS_MESSAGES.WORKSPACE_CREATED, STATUS_CODES.CREATED);
  }

  // Dapatkan Workspace berdasarkan ID
  async getWorkspaceById(id) {
    const workspace = await WorkspaceRepository.findWorkspaceById(id);
    if (!workspace) {
      throwError(ERROR_MESSAGES.WORKSPACE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new WorkspaceDTO(workspace);
    return buildResponse(data, SUCCESS_MESSAGES.WORKSPACE_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  // Dapatkan semua Workspace milik User tertentu
  async getUserWorkspaces(userId) {
    const workspaces = await WorkspaceRepository.findWorkspacesByUserId(userId);
    const data = workspaces.map((workspace) => new WorkspaceResponseDTO(workspace));
    return buildResponse(data, SUCCESS_MESSAGES.USER_WORKSPACES_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  // Perbarui Workspace
  async updateWorkspace(id, updateWorkspaceRequestDTO) {
    validateDTO(updateWorkspaceRequestDTO, UpdateWorkspaceRequestDTO);
    const workspace = await WorkspaceRepository.updateWorkspace(id, updateWorkspaceRequestDTO);
    const data = new WorkspaceResponseDTO(workspace);
    return buildResponse(data, SUCCESS_MESSAGES.WORKSPACE_UPDATED, STATUS_CODES.SUCCESS);
  }

  // Hapus Workspace
  async deleteWorkspace(id) {
    await WorkspaceRepository.deleteWorkspace(id);
    const data = new DeleteWorkspaceResponseDTO('Workspace berhasil dihapus');
    return buildResponse(data, SUCCESS_MESSAGES.WORKSPACE_DELETED, STATUS_CODES.SUCCESS);
  }
}

export default new WorkspaceService();