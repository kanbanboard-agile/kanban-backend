'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Task_Attachments', {
      attachment_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      taskId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Tasks', // Sesuai dengan nama tabel di migration Tasks
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      file_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      uploaded_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Task_Attachments');
  },
};
