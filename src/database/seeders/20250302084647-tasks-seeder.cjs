"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tasks", [
      {
        workspaceId: 1,
        title: "Research New Tech",
        description: "Explore new AI trends and their applications.",
        status: "To Do",
        deadline: new Date("2025-04-01"),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspaceId: 2,
        title: "Design Marketing Strategy",
        description: "Develop a social media marketing plan.",
        status: "Ongoing",
        deadline: new Date("2025-03-13"),
        isAiGenerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspaceId: 3,
        title: "Client Proposal",
        description: "Draft and finalize proposal for new client.",
        status: "Done",
        deadline: new Date("2025-03-20"),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
