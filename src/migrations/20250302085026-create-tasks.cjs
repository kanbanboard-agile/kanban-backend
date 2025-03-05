'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      workspaceId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Workspaces', // Sesuai dengan nama tabel di migration Workspaces
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('To Do', 'Ongoing', 'Done'),
        allowNull: false,
        defaultValue: 'To Do',
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isAiGenerated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  },
};
