class WorkspaceDTO {
  constructor(workspace) {
    this.id = workspace.id;
    this.userId = workspace.userId;
    this.name = workspace.name;
    this.priority = workspace.priority;
    this.logoUrl = workspace.logoUrl;
    this.createdAt = workspace.createdAt;
    this.updatedAt = workspace.updatedAt;
  }

  static fromDatabaseModel(workspace) {
    return new WorkspaceDTO(workspace);
  }
}

class CreateWorkspaceRequestDTO {
  constructor(userId, name, priority, logoUrl = null) {
    this.userId = userId;
    this.name = name;
    this.priority = priority;
    this.logoUrl = logoUrl;
  }
}

class UpdateWorkspaceRequestDTO {
  constructor(name, priority, logoUrl) {
    this.name = name;
    this.priority = priority;
    this.logoUrl = logoUrl;
  }
}

class WorkspaceResponseDTO {
  constructor(workspace) {
    this.workspace = new WorkspaceDTO(workspace);
  }
}

class DeleteWorkspaceResponseDTO {
  constructor(message) {
    this.message = message;
  }
}

export {
  WorkspaceDTO,
  CreateWorkspaceRequestDTO,
  UpdateWorkspaceRequestDTO,
  WorkspaceResponseDTO,
  DeleteWorkspaceResponseDTO,
};
