'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
      {
        workspaceId: 1,
        title: 'Research New Tech',
        description: 'Explore new AI trends and their applications.',
        status: 'Upcoming Work',
        progress: 0,
        deadline: new Date('2025-04-01'),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspaceId: 2,
        title: 'Design Marketing Strategy',
        description: 'Develop a social media marketing plan.',
        status: 'To Do',
        progress: 10,
        deadline: new Date('2025-03-15'),
        isAiGenerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspaceId: 3,
        title: 'Client Proposal',
        description: 'Draft and finalize proposal for new client.',
        status: 'Review',
        progress: 70,
        deadline: new Date('2025-03-20'),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
