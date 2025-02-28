'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true, // Nullable karena provider eksternal seperti Google tidak memerlukan password
      },
      avatar: {
        type: Sequelize.STRING, // URL avatar dari cloud storage
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING, // 'local', 'google', dll.
        allowNull: false,
        defaultValue: 'local',
      },
      resetToken: {
        type: Sequelize.STRING, // Token untuk reset password
        allowNull: true,
      },
      resetTokenExpires: {
        type: Sequelize.DATE, // Waktu kadaluarsa token reset
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  },
};
