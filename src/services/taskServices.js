import TaskRepository from "../repositories/taskRepository.js";
import {
  TaskDTO,
  CreateTaskRequestDTO,
  UpdateTaskRequestDTO,
  TaskResponseDTO,
  DeleteTaskResponseDTO,
} from "../domain/dto/taskDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

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

class TaskService {
  // Buat Task baru
  async createTask(createTaskRequestDTO) {
    validateDTO(createTaskRequestDTO, CreateTaskRequestDTO);
    const task = await TaskRepository.createTask(createTaskRequestDTO);
    const data = new TaskResponseDTO(task);
    return buildResponse(
      data,
      SUCCESS_MESSAGES.TASK_CREATED,
      STATUS_CODES.CREATED
    );
  }

  // Dapatkan Task berdasarkan ID
  async getTaskById(id) {
    const task = await TaskRepository.findTaskById(id);
    if (!task) {
      throwError(ERROR_MESSAGES.TASK_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new TaskDTO(task);
    return buildResponse(
      data,
      SUCCESS_MESSAGES.TASK_RETRIEVED,
      STATUS_CODES.SUCCESS
    );
  }

  // Dapatkan semua Task dalam Workspace tertentu
  async getTasksByWorkspaceId(workspaceId) {
    const tasks = await TaskRepository.findTasksByWorkspaceId(workspaceId);
    const data = tasks.map((task) => new TaskResponseDTO(task));
    return buildResponse(
      data,
      SUCCESS_MESSAGES.WORKSPACE_TASKS_RETRIEVED,
      STATUS_CODES.SUCCESS
    );
  }

  // Perbarui Task
  async updateTask(id, updateTaskRequestDTO) {
    validateDTO(updateTaskRequestDTO, UpdateTaskRequestDTO);
    const task = await TaskRepository.updateTask(id, updateTaskRequestDTO);
    const data = new TaskResponseDTO(task);
    return buildResponse(
      data,
      SUCCESS_MESSAGES.TASK_UPDATED,
      STATUS_CODES.SUCCESS
    );
  }

  // Hapus Task
  async deleteTask(id) {
    await TaskRepository.deleteTask(id);
    const data = new DeleteTaskResponseDTO("Task berhasil dihapus");
    return buildResponse(
      data,
      SUCCESS_MESSAGES.TASK_DELETED,
      STATUS_CODES.SUCCESS
    );
  }

  async getTasksByDeadlineRange(startTime, endTime) {
    const tasks = await TaskRepository.findTasksByDeadlineRange(
      startTime,
      endTime
    );

    if (!tasks.length) {
      return buildResponse(
        [],
        "Tidak ada task yang mendekati deadline",
        STATUS_CODES.SUCCESS
      );
    }

    const data = tasks.map((task) => new TaskResponseDTO(task));
    return buildResponse(
      data,
      "Task mendekati deadline ditemukan",
      STATUS_CODES.SUCCESS
    );
  }
}

export default new TaskService();
