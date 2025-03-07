'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Task_Attachments', [
      {
        taskId: 1,
        file_url: 'https://example.com/files/research.pdf',
        file_type: 'pdf',
        uploaded_at: new Date(),
      },
      {
        taskId: 2,
        file_url: 'https://example.com/files/marketing.jpg',
        file_type: 'image',
        uploaded_at: new Date(),
      },
      {
        taskId: 3,
        file_url: 'https://example.com/files/proposal.docx',
        file_type: 'text',
        uploaded_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Task_Attachments', null, {});
  },
};
