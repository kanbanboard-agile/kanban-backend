import Task from "../domain/model/taskModel.js";
import { TaskDTO, TaskResponseDTO } from "../domain/dto/taskDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";
import { Op } from "sequelize";
import Workspace from "../domain/model/workspaceModel.js";
import User from "../domain/model/userModel.js";

class TaskRepository {
  // Helper untuk membungkus error dengan status code
  #throwError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }

  // Create Task
  async createTask(createTaskRequestDTO) {
    const task = await Task.create({
      workspaceId: createTaskRequestDTO.workspaceId,
      title: createTaskRequestDTO.title,
      description: createTaskRequestDTO.description,
      status: createTaskRequestDTO.status,
      deadline: createTaskRequestDTO.deadline,
      isAiGenerated: createTaskRequestDTO.isAiGenerated,
    });
    return task;
  }

  // Get Task by ID
  async findTaskById(task_id) {
    const task = await Task.findByPk(task_id);
    if (!task) {
      throw new Error("Task not found");
    }
    console.log("Task from DB:", task);
    return task;
  }

  // Get All Tasks by Workspace ID
  async findTasksByWorkspaceId(workspaceId) {
    const tasks = await Task.findAll({ where: { workspaceId: workspaceId } });

    return tasks.map((task) => new TaskDTO(task));
  }

  // Update Task
  async updateTask(task_id, updateTaskRequestDTO) {
    const task = await Task.findByPk(task_id);

    if (!task) {
      throw new Error("Task not found");
    }

    await task.update({
      title: updateTaskRequestDTO.title || task.title,
      description: updateTaskRequestDTO.description || task.description,
      status: updateTaskRequestDTO.status || task.status,
      deadline: updateTaskRequestDTO.deadline || task.deadline,
      isAiGenerated: updateTaskRequestDTO.isAiGenerated ?? task.isAiGenerated,
    });

    console.log("Updated Task from DB:", task); // Log data dari database

    return task;
  }

  // Delete Task
  async deleteTask(task_id) {
    try {
      const task = await Task.findByPk(task_id);

      if (!task) {
        this.#throwError(ERROR_MESSAGES.TASK_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      await task.destroy();

      return {
        data: null,
        message: SUCCESS_MESSAGES.TASK_DELETED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.#throwError(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ambil Task dengan deadline di antara rentang waktu tertentu
  async findTasksByDeadlineRange(startDate, endDate) {
    const tasks = await Task.findAll({
      where: {
        deadline: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Workspace,
          as: "workspace",
          include: [
            {
              model: User,
              as: "user", // Ambil relasi user dari workspace
              attributes: ["id"], // Ambil hanya userId
            },
          ],
        },
      ],
    });

    if (tasks.length === 0) {
      console.log("Tidak ada task dengan deadline dalam rentang waktu ini.");
    }

    return tasks;
  }
}

export default new TaskRepository();
