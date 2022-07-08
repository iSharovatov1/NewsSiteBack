module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('News', [{
    title: 'John',
    text: 'Doe',
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  async down(queryInterface) {
    return queryInterface.bulkDelete('News', null, {});
  },
};
