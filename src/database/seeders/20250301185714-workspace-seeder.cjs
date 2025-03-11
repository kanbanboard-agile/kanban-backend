"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Workspaces", [
      {
        userId: 1,
        name: "Tech Innovators",
        priority: "On Track",
        logoUrl: "https://example.com/logos/tech-innovators.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: "Creative Minds",
        priority: "At Risk",
        logoUrl: "https://example.com/logos/creative-minds.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        name: "Business Solutions",
        priority: "On Hold",
        logoUrl: "https://example.com/logos/business-solutions.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Workspaces", null, {});
  },
};
