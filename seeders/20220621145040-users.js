module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      name: '12345',
      surname: '1223452',
      email: 'npm@mail.ru',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
