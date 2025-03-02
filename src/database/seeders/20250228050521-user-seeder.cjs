"use strict";

const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash("password123", saltRounds);

    // Cek apakah email sudah ada di database sebelum insert
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT email FROM "Users" WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'admin@example.com');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingEmails = existingUsers.map((user) => user.email);

    const usersToInsert = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        avatar: "https://cloudstorage.com/avatars/john.jpg",
        provider: "local",
        resetToken: null,
        resetTokenExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: null,
        avatar: null,
        provider: "google",
        resetToken: null,
        resetTokenExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        avatar: "https://cloudstorage.com/avatars/admin.jpg",
        provider: "local",
        resetToken: "abc123xyz",
        resetTokenExpires: new Date(Date.now() + 3600000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ].filter((user) => !existingEmails.includes(user.email));

    if (usersToInsert.length > 0) {
      await queryInterface.bulkInsert("Users", usersToInsert);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      email: [
        "john.doe@example.com",
        "jane.smith@example.com",
        "admin@example.com",
      ],
    });
  },
};
