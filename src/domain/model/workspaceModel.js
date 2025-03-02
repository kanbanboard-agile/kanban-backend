import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js'; 
import User from './userModel.js';

const Workspace = sequelize.define(
  'Workspace',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User, 
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true, 
      validate: {
        isUrl: true, 
      },
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


Workspace.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Workspace, { foreignKey: 'userId', as: 'workspaces' });

export default Workspace;
