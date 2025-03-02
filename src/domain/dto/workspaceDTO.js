class WorkspaceDTO {
  constructor(workspace) {
    this.id = workspace.id;
    this.userId = workspace.userId;
    this.name = workspace.name;
    this.logoUrl = workspace.logoUrl;
    this.createdAt = workspace.createdAt;
    this.updatedAt = workspace.updatedAt;
  }

  static fromDatabaseModel(workspace) {
    return new WorkspaceDTO(workspace);
  }
}

class CreateWorkspaceRequestDTO {
  constructor(userId, name, logoUrl = null) {
    this.userId = userId;
    this.name = name;
    this.logoUrl = logoUrl;
  }
}

class UpdateWorkspaceRequestDTO {
  constructor(name, logoUrl) {
    this.name = name;
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