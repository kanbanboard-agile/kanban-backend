import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import Task from './taskModel.js';

const Task_Attachments = sequelize.define(
  'Task_Attachments',
  {
    attachment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    taskId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    file_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    file_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Relasi dengan Task
Task_Attachments.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
Task.hasMany(Task_Attachments, { foreignKey: 'taskId', as: 'attachments' });

export default Task_Attachments;
