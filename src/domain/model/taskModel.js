import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import Workspace from './workspaceModel.js';

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    workspaceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Workspace,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Upcoming Work', 'To Do', 'Review', 'Done'),
      allowNull: false,
      defaultValue: 'Upcoming Work',
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isAiGenerated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

// Relasi dengan Workspace
Task.belongsTo(Workspace, { foreignKey: 'workspaceId', as: 'workspace' });
Workspace.hasMany(Task, { foreignKey: 'workspaceId', as: 'tasks' });

export default Task;
