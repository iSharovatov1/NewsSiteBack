module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('News', [{
    title: 'Food',
    text: 'Food',
    tags: 'food',
    img: '',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  async down(queryInterface) {
    return queryInterface.bulkDelete('News', null, {});
  },
};
