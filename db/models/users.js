const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Tokens, {
        foreignKey: 'user_id',
        as: 'Tokens',
      });
      Users.hasMany(models.News, {
        foreignKey: 'user_id',
        as: 'News',
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
