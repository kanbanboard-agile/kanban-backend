class TaskDTO {
  constructor(task) {
    this.id = task.id;
    this.workspaceId = task.workspaceId;
    this.userId = task.workspace?.user?.id || null;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.deadline = task.deadline;
    this.isAiGenerated = task.isAiGenerated;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }

  static fromDatabaseModel(task) {
    return new TaskDTO(task);
  }
}

class CreateTaskRequestDTO {
  constructor(
    workspaceId,
    title,
    description = null,
    status = "To Do",
    deadline,
    isAiGenerated = false
  ) {
    this.workspaceId = workspaceId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.deadline = deadline;
    this.isAiGenerated = isAiGenerated;
  }
}

class UpdateTaskRequestDTO {
  constructor(title, description, status, deadline, isAiGenerated) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.deadline = deadline;
    this.isAiGenerated = isAiGenerated;
  }
}

class TaskResponseDTO {
  constructor(task) {
    this.task = new TaskDTO(task);
  }
}

class DeleteTaskResponseDTO {
  constructor(message) {
    this.message = message;
  }
}

export {
  TaskDTO,
  CreateTaskRequestDTO,
  UpdateTaskRequestDTO,
  TaskResponseDTO,
  DeleteTaskResponseDTO,
};
