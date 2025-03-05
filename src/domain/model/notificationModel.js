import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import Task from './taskModel.js';
import User from './userModel.js';

const Notification = sequelize.define(
  'Notification',
  {
    notification_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Email', 'WhatsApp'),
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Menghindari `createdAt` dan `updatedAt` otomatis
  }
);

// Relasi dengan Task dan User
Notification.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Notification;
