const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.BelongsToMany(models.Tokens, {
        foreignKey: 'userId',
        as: 'tokens',
      });
      Users.BelongsToMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
