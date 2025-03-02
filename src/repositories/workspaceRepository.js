import Workspace from "../domain/model/workspaceModel.js";
import {
  WorkspaceDTO,
  WorkspaceResponseDTO,
} from "../domain/dto/workspaceDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

class WorkspaceRepository {
  // Helper untuk membungkus error dengan status code
  #throwError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }

  // Create Workspace
  async createWorkspace(createWorkspaceRequestDTO) {
    const workspace = await Workspace.create({
      userId: createWorkspaceRequestDTO.userId,
      name: createWorkspaceRequestDTO.name,
      logoUrl: createWorkspaceRequestDTO.logoUrl,
    });
    return workspace;
  }

  // Get Workspace by ID
  async findWorkspaceById(id) {
    const workspace = await Workspace.findByPk(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    console.log("Workspace from DB:", workspace);
    return workspace;
  }

  // Get All Workspaces by User ID
  async findWorkspacesByUserId(userId) {
    const workspaces = await Workspace.findAll({ where: { userId: userId } });

    return workspaces.map((workspace) => new WorkspaceDTO(workspace));
  }

  // Update Workspace
  async updateWorkspace(id, updateWorkspaceRequestDTO) {
    const workspace = await Workspace.findByPk(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    await workspace.update({
      name: updateWorkspaceRequestDTO.name || workspace.name,
      logoUrl: updateWorkspaceRequestDTO.logoUrl || workspace.logoUrl,
    });

    console.log("Updated Workspace from DB:", workspace); // Log data dari database

    return workspace;
  }

  // Delete Workspace
  async deleteWorkspace(id) {
    try {
      const workspace = await Workspace.findByPk(id);

      if (!workspace) {
        this.#throwError(
          ERROR_MESSAGES.WORKSPACE_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }

      await workspace.destroy();

      return {
        data: null,
        message: SUCCESS_MESSAGES.WORKSPACE_DELETED,
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

export default new WorkspaceRepository();
