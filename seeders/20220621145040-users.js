'use strict';
var bcrypt = require("bcrypt-nodejs");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
    username: 'npm@mail.ru',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
