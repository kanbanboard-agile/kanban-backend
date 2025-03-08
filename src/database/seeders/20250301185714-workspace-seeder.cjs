"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Workspaces", [
      {
        userId: 1,
        name: "Tech Innovators",
        logoUrl: "https://example.com/logos/tech-innovators.png",
        attachment: "https://example.com/attachments/tech-innovators-doc.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: "Creative Minds",
        logoUrl: "https://example.com/logos/creative-minds.png",
        attachment: "https://example.com/attachments/creative-minds-doc.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        name: "Business Solutions",
        logoUrl: "https://example.com/logos/business-solutions.png",
        attachment:
          "https://example.com/attachments/business-solutions-doc.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Workspaces", null, {});
  },
};
