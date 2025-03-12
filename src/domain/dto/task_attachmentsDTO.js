class TaskAttachmentDTO {
  constructor(attachment) {
    this.attachment_id = attachment.attachment_id;
    this.taskId = attachment.taskId;
    this.file_url = attachment.file_url;
    this.file_type = attachment.file_type;
    this.uploaded_at = attachment.uploaded_at;
  }

  static fromDatabaseModel(attachment) {
    return new TaskAttachmentDTO(attachment);
  }
}

class CreateTaskAttachmentRequestDTO {
  constructor(taskId, file_url, file_type) {
    this.taskId = taskId;
    this.file_url = file_url;
    this.file_type = file_type;
  }
}

class TaskAttachmentResponseDTO {
  constructor(attachment) {
    this.attachment = new TaskAttachmentDTO(attachment);
  }
}

class DeleteTaskAttachmentResponseDTO {
  constructor(message) {
    this.message = message;
  }
}

export {
  TaskAttachmentDTO,
  CreateTaskAttachmentRequestDTO,
  TaskAttachmentResponseDTO,
  DeleteTaskAttachmentResponseDTO,
};
