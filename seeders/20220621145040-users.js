module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      username: 'npm@mail.ru',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
